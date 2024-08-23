import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from "@angular/core";

import { Subscription } from "rxjs";
import { Status, TodoItem } from "../../types/todolist.type";
import { TodolistService } from "../../services/todolist.service";

@Component({
  selector: "tdl-listing",
  templateUrl: "./todolist-listing.component.html",
  styleUrls: ["./todolist-listing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistListingComponent implements OnDestroy {
  @Input() statusValue: Status = Status.All;
  @Output() status = new EventEmitter<Status>();

  todos$ = this.todolistService.todos$;
  getTodosSub: Subscription = this.todolistService.getTodolist().subscribe(value => {
    this.todos$.next(value)
  })
  todosSub: Subscription = this.todos$.subscribe(val => {
    if (val.length === 0 ) this.status.emit(Status.All);
  })
  activeTodos$ = this.todolistService.activeTodos$;
  completedTodos$ = this.todolistService.completedTodos$;

  constructor(private todolistService: TodolistService) {}

  removeTodo(todo: TodoItem): void {
    this.todolistService.removeItem(todo.id);
  }

  ngOnDestroy() {
    this.todosSub.unsubscribe()
    this.getTodosSub.unsubscribe()
  }
}
