import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";

import { Subject  } from "rxjs";
import { Status, TodoItem } from "../../types/todolist.type";
import { TodolistService } from "../../services/todolist.service";

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

  constructor(private todolistService: TodolistService) {}

  removeTodo(todo: TodoItem): void {
    this.todolistService.removeItem(todo.id);
  }

  ngOnInit() {
    this.todolistService
    .getTodolist()
    .subscribe(value => {
      this.todos$.next(value);
    });

    this.todos$.subscribe(todo => {
      if (todo.length === 0) this.status.emit(Status.All);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
