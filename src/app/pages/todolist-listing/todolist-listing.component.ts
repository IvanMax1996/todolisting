import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from "@angular/core";
import { Status, TodoItem } from "../../shared/types/todolist.type";
import { TodolistService } from "../../shared/services/todolist.service";
import { Subscription } from "rxjs";

@Component({
  selector: "tdl-listing",
  templateUrl: "./todolist-listing.component.html",
  styleUrls: ["./todolist-listing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistListingComponent implements OnDestroy {
  @Input() statusValue!: Status;
  @Output() status = new EventEmitter<Status>();

  todos$ = this.todolistService.todos$;
  activeTodos$ = this.todolistService.activeTodos$;
  completedTodos$ = this.todolistService.completedTodos$;
  todosSub: Subscription = this.todos$.subscribe(val => {
    if (val.length === 0 ) this.status.emit(Status.All);
  })
  
  constructor(private todolistService: TodolistService) {}

  removeTodo(todo: TodoItem): void {
    this.todolistService.removeItem(todo.id);
  }

  ngOnDestroy() {
    this.todosSub.unsubscribe()
  }
}
