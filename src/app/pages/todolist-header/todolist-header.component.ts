import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { TodolistService } from "../../shared/services/todolist.service";
import { Status, TodoItem } from "../../shared/types/todolist.type";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "tdl-header",
  templateUrl: "./todolist-header.component.html",
  styleUrls: ["./todolist-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodolistHeaderComponent {
  @Input() status: Status = Status.All

  title: string = "";
  todosLength$: Observable<number> = this.todolistService.todosLength$
  isToggleBtnVisible$: Observable<boolean> = this.todolistService.isToggleBtnVisible$
  activeTodosLength$: Observable<number> = this.todolistService.activeTodosLength$
  completedTodosLength$: Observable<number> = this.todolistService.completedTodosLength$
  test = this.todolistService.todos$

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

  ngDoCheck() {
    
  }
}
