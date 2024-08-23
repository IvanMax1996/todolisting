import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { TodoItem } from "../../types/todolist.type";
import { TodolistService } from "../../services/todolist.service";
import { Subscription } from "rxjs";

@Component({
  selector: "tdl-item",
  templateUrl: "./todolist-item.component.html",
  styleUrls: ["./todolist-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistItemComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Output() remove = new EventEmitter<TodoItem>();
  @Input() todo!: TodoItem;
  @ViewChild("todoInputRef") inputRef?: ElementRef;

  isEditing = false;
  randomLabel: string = "";
  title: string = "";
  activeTodos$ = this.todolistService.activeTodos$;
  completedTodos$ = this.todolistService.completedTodos$;
  previousElement?: HTMLElement | undefined
  updateTodoSub?: Subscription

  constructor(private todolistService: TodolistService) {}

  removeTodo(): void {
    this.todolistService.deleteTodoItem(this.todo.id)

    this.remove.emit(this.todo);
  }

  toggleTodo(): void {
    this.todolistService.toggleCheckedItem(this.todo);
  }

  startEdit(): void {
    this.isEditing = true;
  }

  updateTodo(): void {
    const body = {
      title: this.title,
      completed: this.todo.completed
    }

    if (!this.title) {
      this.remove.emit(this.todo);
    } else {
      this.updateTodoSub = this.todolistService.updateTodoItem(this.todo.id, body).subscribe(todoItem => {
        this.todolistService.updateTodo(todoItem, todoItem.title);
      })
    }

    this.isEditing = false;
  }

  handleBlur(): void {
    this.isEditing = false;
  }

  handleFocus(): void {
    this.title = this.todo.title;
  }

  active(elem: Event) {
    const currentElement = elem.currentTarget as HTMLElement;
    const itemArray = document.querySelectorAll(".todolist__item");

    if (currentElement === this.previousElement && currentElement.classList.contains('active')) {
      currentElement.classList.remove("active");
      return
    }

    itemArray.forEach(item => {
      item.classList.remove('active')
    });

    this.previousElement = currentElement
    currentElement.classList.add("active");
  }

  ngOnInit(): void {
    this.randomLabel =
      this.todo.title.replace(" ", "-").slice(0, 10) +
      "-" +
      Math.floor(Math.random() * 1000);
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.inputRef?.nativeElement.focus();
    }
  }

  ngOnDestroy() {
    this.updateTodoSub?.unsubscribe()
  }
}
