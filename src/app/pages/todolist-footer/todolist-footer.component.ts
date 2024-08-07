import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from "@angular/core";
import { Status, TodoItem } from "../../shared/types/todolist.type";
import { TodolistService } from "../../shared/services/todolist.service";

@Component({
  selector: "tdl-footer",
  templateUrl: "./todolist-footer.component.html",
  styleUrls: ["./todolist-footer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistFooterComponent {
  @ViewChild("footerBtnRef") btnRef?: ElementRef;

  constructor(private todolistService: TodolistService, private cd: ChangeDetectorRef) {}

  get activeTodos(): TodoItem[] {
    let activeArray: TodoItem[] = [];

    this.todolistService.activeTodos.subscribe(item => {
      activeArray = item;
    });

    return activeArray;
  }

  get completedTodos(): TodoItem[] {
    let completedArray: TodoItem[] = [];

    this.todolistService.completedTodos.subscribe(item => {
      completedArray = item;
    });

    return completedArray;
  }

  visibilityToggleButton(filteredTodo: TodoItem[]): void {
    if (filteredTodo.length === 0) {
      this.todolistService.toggleBtnVisible = false;
    } else this.todolistService.toggleBtnVisible = true;
  }

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
    this.todolistService.status = Status.Active;

    this.visibilityToggleButton(this.activeTodos);

    this.removeActiveClass(event);
  }

  getCompleted(event: Event): void {
    this.todolistService.status = Status.Completed;

    this.visibilityToggleButton(this.completedTodos);

    this.removeActiveClass(event);
  }

  getAll(event: Event): void {
    this.todolistService.status = Status.All;
    this.todolistService.toggleBtnVisible = true;

    this.removeActiveClass(event);
  }

  clearCompleted(): void {
    this.todolistService.clearCompleted();

    if (this.activeTodos.length === 0) {
      this.todolistService.status = Status.All;
    }
  }

  ngDoCheck() {
    this.cd.detectChanges()
  }
}
