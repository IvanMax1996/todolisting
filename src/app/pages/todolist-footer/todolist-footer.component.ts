import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output
} from "@angular/core";
import { Status } from "../../shared/types/todolist.type";
import { TodolistService } from "../../shared/services/todolist.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "tdl-footer",
  templateUrl: "./todolist-footer.component.html",
  styleUrls: ["./todolist-footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistFooterComponent implements OnDestroy {
  @Output() status = new EventEmitter<Status>();

  todos$ = this.todolistService.todos$;
  activeTodosLength$: Observable<number> =
    this.todolistService.activeTodosLength$;
  completedTodosLength$: Observable<number> =
    this.todolistService.completedTodosLength$;
  todosSub: Subscription = this.todos$.subscribe(val => {
    if (val.length === 0 ) this.status.emit(Status.All);
  })
  
  constructor(private todolistService: TodolistService) {}

  removeActiveClass(event: Event): void {
    const allBtnFooter = document.querySelectorAll(
      ".todolist__footer-btn-wrap button"
    );

    allBtnFooter.forEach(btn => {
      btn.classList.remove("active");
    });

    const btn = <HTMLElement>event.target;

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
    this.todolistService.clearCompleted();
  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe()
  }
}
