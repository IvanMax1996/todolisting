import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { Status, TodoItem } from "../../shared/types/todolist.type";
import { TodolistService } from "../../shared/services/todolist.service";
import { combineLatest } from "rxjs";
import { TodolistFooterComponent } from "../todolist-footer/todolist-footer.component";

@Component({
  selector: "tdl-listing",
  templateUrl: "./todolist-listing.component.html",
  styleUrls: ["./todolist-listing.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [TodolistFooterComponent]
})
export class TodolistListingComponent {
  @Input() status!: Status
  @Output() testThree = new EventEmitter<Status>();

  test = this.todolistService.todos$;
  activeTodos$ = this.todolistService.activeTodos$;
  completedTodos$ = this.todolistService.completedTodos$;

  constructor(
    private todolistService: TodolistService,
    private cd: ChangeDetectorRef,
    private com: TodolistFooterComponent
  ) {}

  removeTodo(todo: TodoItem): void {
    this.todolistService.removeItem(todo.id);

    this.test.forEach(item => {
      if (item.length === 0) this.testThree.emit(Status.All);
    })

    // combineLatest([this.activeTodos$, this.completedTodos$]).forEach(items => {
    //   const activeTodosLength = items[0].length;
    //   const completedTodosLength = items[1].length;

    //   if (activeTodosLength === 0 && completedTodosLength) {
    //     this.testThree.emit(Status.All);
    //   }
    // });
  }

  ngDoCheck() {
    console.log(this.status);
    this.test.forEach(item => {
      console.log(item)
    })
  }


}
