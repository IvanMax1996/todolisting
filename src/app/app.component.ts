import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Status } from './shared/types/todolist.type';
import { TodolistService } from './shared/services/todolist.service';
import { TodolistFooterComponent } from './pages/todolist-footer/todolist-footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  title = "Todos";
  statusParam: Status = this.todolistService.status



  constructor(
    private todolistService: TodolistService
  ) {}

  status(val: Status) {
    this.statusParam = val
  }

  ngDoCheck() {
   
  }
}
