import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";
import { Status } from "../../shared/types/todolist.type";
import { TodolistService } from "../../shared/services/todolist.service";
import { Observable } from "rxjs";

@Component({
  selector: "tdl-footer",
  templateUrl: "./todolist-footer.component.html",
  styleUrls: ["./todolist-footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodolistFooterComponent {
  @Output() test = new EventEmitter<Status>();
  @ViewChild("footerBtnRef") btnRef?: ElementRef;
  @ViewChild("btnRef") btnRefTwo?: ElementRef;


  activeTodosLength$: Observable<number> =
    this.todolistService.activeTodosLength$;
  completedTodosLength$: Observable<number> =
    this.todolistService.completedTodosLength$;
    todos = this.todolistService.todos$

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
    // this.todolistService.status = Status.Active;
    this.test.emit(Status.Active);

    this.removeActiveClass(event);
  }

  getCompleted(event: Event): void {
    // this.todolistService.status = Status.Completed;

    this.test.emit(Status.Completed);

    this.removeActiveClass(event);
  }

  getAll(event: Event): void {
    console.log('клик')
    this.test.emit(Status.All);

    this.removeActiveClass(event);
  }

  clearCompleted(): void {
    this.todolistService.clearCompleted();

    this.todos.forEach(item => {
      if (item.length === 0) this.test.emit(Status.All);
    })
  }

 
}
