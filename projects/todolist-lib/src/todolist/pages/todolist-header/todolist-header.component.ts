import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Status } from "../../types/todolist.type";
import { TodolistService } from "../../services/todolist.service";

@Component({
  selector: "tdl-header",
  templateUrl: "./todolist-header.component.html",
  styleUrls: ["./todolist-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistHeaderComponent {
  @Input() status: Status = Status.All;

  title: string = "";
  todosLength$: Observable<number> = this.todolistService.todosLength$;
  activeTodosLength$: Observable<number> =
    this.todolistService.activeTodosLength$;
  completedTodosLength$: Observable<number> =
    this.todolistService.completedTodosLength$;

  constructor(private todolistService: TodolistService) {}

  addTodo(): void {
    if (this.title) {
      this.todolistService.addItem(this.title);

      this.title = "";
    }
  }

  toggleAll(): void {
    this.todolistService.toggleAll(this.status);
  }
}
