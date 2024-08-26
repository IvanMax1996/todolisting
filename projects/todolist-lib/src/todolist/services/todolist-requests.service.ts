import { Injectable } from "@angular/core";
import { TodoItem } from "../types/todolist.type";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TodolistRequestsService {
  constructor(private http: HttpClient) {}

  getTodolist(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(
      "https://jsonplaceholder.typicode.com/todos"
    );
  }

  addTodoItem(body: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(
      "https://jsonplaceholder.typicode.com/todos",
      body
    );
  }

  deleteTodoItem(id: number): Observable<object> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  updateTodoItem(
    id: number,
    body: { title: string; completed: boolean }
  ): Observable<TodoItem> {
    return this.http.patch<TodoItem>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      body
    );
  }
}
