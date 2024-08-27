import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { TodoItem } from "../types/todolist.type";

@Injectable({
  providedIn: "root"
})
export class TodolistInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === "GET") {
      return next.handle(req).pipe(
        map(event => {
          if (event.type === HttpEventType.Response) {
            event.body.length = 5;

            return event.body.map((item: TodoItem) => {
              return {
                id: item.id,
                title: item.title,
                completed: item.completed
              };
            });
          }
        }),
        tap(todoList => {
          const todolistJson = JSON.stringify(todoList);

          localStorage.setItem("todolist", todolistJson);
        })
      );
    }

    return next.handle(req);
  }
}
