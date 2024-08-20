import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TodolistListingComponent } from "./pages/todolist-listing/todolist-listing.component";
import { TodolistHeaderComponent } from './pages/todolist-header/todolist-header.component';
import { TodolistItemComponent } from './pages/todolist-item/todolist-item.component';
import { TodolistFooterComponent } from './pages/todolist-footer/todolist-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodolistListingComponent,
    TodolistHeaderComponent,
    TodolistItemComponent,
    TodolistFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
