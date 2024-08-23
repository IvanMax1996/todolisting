import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Status } from "../../types/todolist.type";
import { TodolistService } from "../../services/todolist.service";

@Component({
  selector: "tdl-header",
  templateUrl: "./todolist-header.component.html",
  styleUrls: ["./todolist-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistHeaderComponent implements OnDestroy {
  @Input() status: Status = Status.All;

  title: string = "";
  todosLength$: Observable<number> = this.todolistService.todosLength$;
  activeTodosLength$: Observable<number> =
    this.todolistService.activeTodosLength$;
  completedTodosLength$: Observable<number> =
    this.todolistService.completedTodosLength$;
  addTodoSub?: Subscription;

  constructor(private todolistService: TodolistService) {}

  addTodo(): void {
    const body = {
      id: 1,
      userId: 1,
      completed: false,
      title: this.title
    };

    if (this.title) {
      this.addTodoSub = this.todolistService
        .addTodoItem(body)
        .subscribe(todoItem => {
          this.todolistService.addItem(todoItem.title);
        });

      this.title = "";
    }
  }

  toggleAll(): void {
    this.todolistService.toggleAll(this.status);
  }

  ngOnDestroy() {
    this.addTodoSub?.unsubscribe();
  }
}
