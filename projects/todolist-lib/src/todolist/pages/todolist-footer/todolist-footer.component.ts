import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from "@angular/core";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import { Status, TodoItem } from "../../types/todolist.type";
import { TodolistService } from "../../services/todolist.service";
import { TodolistRequestsService } from "../../services/todolist-requests.service";

@Component({
  selector: "tdl-footer",
  templateUrl: "./todolist-footer.component.html",
  styleUrls: ["./todolist-footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistFooterComponent {
  @Output() status = new EventEmitter<Status>();

  todos$: BehaviorSubject<TodoItem[]> = this.todolistService.todos$;
  activeTodosLength$: Observable<number> =
    this.todolistService.activeTodosLength$;
  completedTodosLength$: Observable<number> =
    this.todolistService.completedTodosLength$;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private todolistService: TodolistService,
    private todoListRequestsService: TodolistRequestsService
  ) {}

  removeActiveClass(event: Event): void {
    const allBtnFooter: NodeListOf<Element> = document.querySelectorAll(
      ".todolist__footer-btn-wrap button"
    );

    allBtnFooter.forEach((btn: Element) => {
      btn.classList.remove("active");
    });

    const btn: HTMLElement = <HTMLElement>event.target;

    btn.classList.add("active");
  }

  getActive(event: Event): void {
    this.status.emit(Status.Active);

    this.removeActiveClass(event);
  }

  getCompleted(event: Event): void {
    this.status.emit(Status.Completed);

    this.removeActiveClass(event);
  }

  getAll(event: Event): void {
    this.status.emit(Status.All);

    this.removeActiveClass(event);
  }

  clearCompleted(): void {
    const arrayDeleteId: number[] = this.todolistService.clearCompletedId();

    arrayDeleteId.forEach((id: number) => {
      this.todoListRequestsService
        .deleteTodoItem(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    });

    this.todolistService.clearCompletedAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
