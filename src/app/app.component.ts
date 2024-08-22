import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Status } from '@t1/todolist-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "Todos";
  status: Status = Status.All

  getStatus(value: Status) {
    this.status = value
  }
}
