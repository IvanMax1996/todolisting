import { Injectable } from "@angular/core";
import { Status, TodoItem } from "../types/todolist.type";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TodolistRequestsService } from "./todolist-requests.service";

@Injectable({
  providedIn: "root"
})
export class TodolistService {
  todos$: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  todosLength$: Observable<number> = this.todos$.pipe(map(item => item.length));
  activeTodos$: Observable<TodoItem[]> = this.getItems(Status.Active);
  completedTodos$: Observable<TodoItem[]> = this.getItems(Status.Completed);
  activeTodosLength$: Observable<number> = this.activeTodos$.pipe(
    map(item => item.length)
  );
  completedTodosLength$: Observable<number> = this.completedTodos$.pipe(
    map(item => item.length)
  );

  constructor(
    private http: HttpClient,
    private todolistRequestsService: TodolistRequestsService
  ) {}

  addItem(body: TodoItem): Observable<TodoItem> {
    return this.todolistRequestsService.addTodoItem(body).pipe(
      tap(todo => {
        const todoItem: TodoItem = {
          id: Date.now(),
          title: todo.title,
          completed: todo.completed
        };

        this.todos$.next(this.todos$.value.concat([todoItem]));
      })
    );
  }

  getItems(status: Status): Observable<TodoItem[]> {
    return this.todos$.pipe(
      map(items =>
        items.filter(item => {
          if (status === Status.Active) return !item.completed;
          else if (status === Status.Completed) return item.completed;
          else return item;
        })
      )
    );
  }

  removeItem(id: number): void {
    this.todolistRequestsService.deleteTodoItem(id)

    const indexItem: number = this.todos$.value.findIndex(
      item => item.id === id
    );

    this.todos$.value.splice(indexItem, 1);
    this.todos$.next(this.todos$.value);
  }

  toggleCheckedItem(todo: TodoItem): void {
    let arrayResult: TodoItem[];

    arrayResult = this.todos$.value.map(item => {
      if (item.id === todo.id) return { ...item, completed: !item.completed };

      return item;
    });

    this.todos$.next(arrayResult);
  }

  toggleAll(status: Status): void {
    let arrayResult: TodoItem[] = [];
    let isCompleted: boolean;

    if (status === Status.Completed) {
      this.completedTodos$.forEach(item => {
        isCompleted = item.every(item => item.completed);
      });
    } else {
      isCompleted = this.todos$.value.every(item => item.completed);
    }

    arrayResult = this.todos$.value.map(item => {
      if ((status === Status.All && !isCompleted) || status === Status.Active)
        return { ...item, completed: true };

      return { ...item, completed: false };
    });

    this.todos$.next(arrayResult);
  }

  updateTodo(id: number, body: { title: string; completed: boolean }): Observable<TodoItem> {
    return this.todolistRequestsService.updateTodoItem(id, body).pipe(
      tap(todo => {
        let arrayResult: TodoItem[];

        arrayResult = this.todos$.value.map(item => {
          if (item.id === todo.id) {
            return { ...item, title: todo.title};
          }

          return item;
        });

        this.todos$.next(arrayResult);
      })
    );
  }

  clearCompleted(): void {
    const arrayDeleteList: TodoItem[] = this.todos$.value.filter(item => {
      return item.completed;
    });

    const arrayDeleteId = arrayDeleteList.map(item => item.id);

    arrayDeleteId.forEach(id => {
      this.todolistRequestsService.deleteTodoItem(id);
    });

    let arrayResult: TodoItem[] = [];

    arrayResult = this.todos$.value.filter(item => {
      return !item.completed;
    });

    this.todos$.next(arrayResult);
  }

  getTodolist(): Observable<TodoItem[]> {
    return this.todolistRequestsService.getTodolist()
  }
}
