import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistFooterComponent } from './pages/todolist-footer/todolist-footer.component';
import { TodolistHeaderComponent } from './pages/todolist-header/todolist-header.component';
import { TodolistItemComponent } from './pages/todolist-item/todolist-item.component';
import { TodolistListingComponent } from './pages/todolist-listing/todolist-listing.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    TodolistFooterComponent,
    TodolistHeaderComponent,
    TodolistItemComponent,
    TodolistListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    TodolistFooterComponent,
    TodolistHeaderComponent,
    TodolistItemComponent,
    TodolistListingComponent
  ]
})
export class TodolistModule {}
