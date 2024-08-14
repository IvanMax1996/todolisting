import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { Status, TodoItem } from "../../shared/types/todolist.type";
import { TodolistService } from "../../shared/services/todolist.service";

@Component({
  selector: "tdl-listing",
  templateUrl: "./todolist-listing.component.html",
  styleUrls: ["./todolist-listing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistListingComponent {
  @Input() statusValue!: Status;
  @Output() status = new EventEmitter<Status>();

  todos$ = this.todolistService.todos$;
  activeTodos$ = this.todolistService.activeTodos$;
  completedTodos$ = this.todolistService.completedTodos$;

  constructor(private todolistService: TodolistService) {}

  removeTodo(todo: TodoItem): void {
    this.todolistService.removeItem(todo.id);

    this.todos$.forEach(item => {
      if (item.length === 0) this.status.emit(Status.All);
    });
  }
}
