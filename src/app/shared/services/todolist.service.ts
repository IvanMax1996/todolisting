import { Injectable } from "@angular/core";
import { Status, TodoItem } from "../types/todolist.type";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodolistService {
  status: Status = Status.All;
  toggleBtnVisible: boolean = true;
  countId: number = 0;
  todos$: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);

  get isAllCompleted(): Observable<boolean> {
    return this.todos$.pipe(map(item => item.every(item => item.completed)));
  }

  get completedTodos(): Observable<TodoItem[]> {
    return this.getItems(Status.Completed);
  }

  get activeTodos(): Observable<TodoItem[]> {
    return this.getItems(Status.Active);
  }

  addItem(title: string): void {
    const todoItem: TodoItem = {
      id: this.countId,
      title,
      completed: false
    };

    this.todos$.next(this.todos$.value.concat([todoItem]));

    this.countId++;
  }

  getItems(status: Status): Observable<TodoItem[]> {
    return this.todos$.pipe(
      map(item =>
        item.filter(item => {
          if (status === Status.Active) return !item.completed;
          else if (status === Status.Completed) return item.completed;
          else return item;
        })
      )
    );
  }

  removeItem(id: number): void {
    let indexItem: number | null = null;
    const todoItem: TodoItem | undefined = this.todos$.value.find(
      item => item.id === id
    );

    if (todoItem) indexItem = this.todos$.value.indexOf(todoItem);

    this.todos$.next((this.todos$.value as any).toSpliced(indexItem, 1));
  }

  toggleCheckedItem(todo: TodoItem): void {
    let arrayResult: TodoItem[];

    arrayResult = this.todos$.value.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    this.todos$.next(arrayResult);
  }

  toggleAll(status: Status, isCompleted: boolean): void {
    let arrayResult: TodoItem[] = [];

    arrayResult = this.todos$.value.map(item => {
      if ((status === Status.All && !isCompleted) || status === Status.Active) {
        if (!item.completed) {
          return { ...item, completed: true };
        }

        return item;
      } else return { ...item, completed: false };
    });

    this.todos$.next(arrayResult);
  }

  updateTodo(todo: TodoItem, title: string) {
    let arrayResult: TodoItem[];

    arrayResult = this.todos$.value.map(item => {
      if (item.id === todo.id) {
        return { ...item, title };
      }

      return item;
    });

    this.todos$.next(arrayResult);
  }

  clearCompleted(): void {
    let arrayResult: TodoItem[] = [];

    arrayResult = this.todos$.value.filter(item => {
      return !item.completed;
    });

    this.todos$.next(arrayResult);
  }

  toggleButtonVisible(
    activeTodosLength: number,
    completedTodosLength: number
  ): void {
    if (this.status !== Status.All) {
      if (activeTodosLength === 0 || completedTodosLength === 0) {
        this.toggleBtnVisible = false;
      } else this.toggleBtnVisible = true;
    }
  }
}
