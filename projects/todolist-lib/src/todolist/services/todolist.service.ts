import { Injectable } from "@angular/core";
import { Status, TodoItem } from "../types/todolist.type";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { TodolistRequestsService } from "./todolist-requests.service";

@Injectable({
  providedIn: "root"
})
export class TodolistService {
  todos$: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  todosLength$: Observable<number> = this.todos$.pipe(
    map((item: TodoItem[]) => item.length)
  );
  activeTodos$: Observable<TodoItem[]> = this.getItems(Status.Active);
  completedTodos$: Observable<TodoItem[]> = this.getItems(Status.Completed);
  activeTodosLength$: Observable<number> = this.activeTodos$.pipe(
    map((items: TodoItem[]) => items.length)
  );
  completedTodosLength$: Observable<number> = this.completedTodos$.pipe(
    map((items: TodoItem[]) => items.length)
  );

  constructor(private todolistRequestsService: TodolistRequestsService) {}

  addItem(body: TodoItem): Observable<TodoItem> {
    return this.todolistRequestsService.addTodoItem(body).pipe(
      tap((todo: TodoItem) => {
        const todoItem: TodoItem = {
          id: Date.now(),
          title: todo.title,
          completed: todo.completed
        };

        const arrayResult: TodoItem[] = this.todos$.value.concat([todoItem]);

        this.todos$.next(arrayResult);
      })
    );
  }

  getItems(status: Status): Observable<TodoItem[]> {
    return this.todos$.pipe(
      map((items: TodoItem[]) =>
        items.filter((item: TodoItem) => {
          if (status === Status.Active) return !item.completed;
          else if (status === Status.Completed) return item.completed;
          else return item;
        })
      )
    );
  }

  removeItem(id: number): void {
    const indexItem: number = this.todos$.value.findIndex(
      (item: TodoItem) => item.id === id
    );

    this.todos$.value.splice(indexItem, 1);
    this.todos$.next(this.todos$.value);
  }

  toggleCheckedItem(todo: TodoItem): void {
    let arrayResult: TodoItem[];

    arrayResult = this.todos$.value.map((item: TodoItem) => {
      if (item.id === todo.id) return { ...item, completed: !item.completed };

      return item;
    });

    this.todos$.next(arrayResult);
  }

  toggleAll(status: Status): void {
    let arrayResult: TodoItem[] = [];
    let isCompleted: boolean;

    if (status === Status.Completed) {
      this.completedTodos$.forEach((item: TodoItem[]) => {
        isCompleted = item.every((item: TodoItem) => item.completed);
      });
    } else {
      isCompleted = this.todos$.value.every((item: TodoItem) => item.completed);
    }

    arrayResult = this.todos$.value.map((item: TodoItem) => {
      if ((status === Status.All && !isCompleted) || status === Status.Active)
        return { ...item, completed: true };

      return { ...item, completed: false };
    });

    this.todos$.next(arrayResult);
  }

  updateTodo(
    id: number,
    body: { title: string; completed: boolean }
  ): Observable<TodoItem> {
    return this.todolistRequestsService.updateTodoItem(id, body).pipe(
      tap((todo: TodoItem) => {
        let arrayResult: TodoItem[];

        arrayResult = this.todos$.value.map(item => {
          if (item.id === todo.id) {
            return { ...item, title: todo.title };
          }

          return item;
        });

        this.todos$.next(arrayResult);
      })
    );
  }

  clearCompletedId(): number[] {
    const arrayDeleteList: TodoItem[] = this.todos$.value.filter(
      (item: TodoItem) => {
        return item.completed;
      }
    );

    return arrayDeleteList.map((item: TodoItem) => item.id);
  }

  clearCompletedAll(): void {
    let arrayResult: TodoItem[] = [];

    arrayResult = this.todos$.value.filter((item: TodoItem) => {
      return !item.completed;
    });

    this.todos$.next(arrayResult);
  }

  getTodolist(): Observable<TodoItem[]> {
    return this.todolistRequestsService.getTodolist();
  }

  getLocalStorage(): TodoItem[] {
    const todoListJson: string | null = localStorage.getItem("todolist");
    let todoList: TodoItem[] = [];

    if (todoListJson) todoList = JSON.parse(todoListJson);

    return todoList;
  }
}
