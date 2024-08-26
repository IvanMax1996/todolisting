import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy
} from "@angular/core";
import { Observable, Subject, takeUntil } from "rxjs";
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
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private todolistService: TodolistService) {}

  addTodo() {
    const body = {
      id: 1,
      userId: 1,
      completed: false,
      title: this.title
    };

    if (this.title) {
      this.todolistService
        .addItem(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe();

      this.title = "";
    }
  }

  toggleAll(): void {
    this.todolistService.toggleAll(this.status);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
