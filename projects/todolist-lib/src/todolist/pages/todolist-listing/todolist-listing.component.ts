import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";

import { Subject, takeUntil } from "rxjs";
import { Status, TodoItem } from "../../types/todolist.type";
import { TodolistService } from "../../services/todolist.service";
import { TodolistRequestsService } from "../../services/todolist-requests.service";

@Component({
  selector: "tdl-listing",
  templateUrl: "./todolist-listing.component.html",
  styleUrls: ["./todolist-listing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistListingComponent implements OnInit, OnDestroy {
  @Input() statusValue: Status = Status.All;
  @Output() status = new EventEmitter<Status>();

  todos$ = this.todolistService.todos$;
  activeTodos$ = this.todolistService.activeTodos$;
  completedTodos$ = this.todolistService.completedTodos$;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private todolistService: TodolistService, private todoListRequestService: TodolistRequestsService) {}

  removeTodo(todo: TodoItem): void {
    this.todoListRequestService
      .deleteTodoItem(todo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.todolistService.removeItem(todo.id);
  }

  getLocalStorage(): void {
    this.todolistService.getTodolist()
    
    const todoList: TodoItem[] = this.todolistService.getLocalStorage()
    this.todos$.next(todoList);
  }

  ngOnInit(): void {
    this.getLocalStorage()

    this.todos$.subscribe((todos: TodoItem[]) => {
      if (todos.length === 0) this.status.emit(Status.All);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
