import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Status, TodolistService } from '@t1/todolist-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "Todos";
  status: Status = this.todolistService.status

  constructor(
    private todolistService: TodolistService
  ) {}

  getStatus(value: Status) {
    this.status = value
  }
}
