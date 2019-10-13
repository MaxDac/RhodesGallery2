import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { PoemsComponent } from './poems/poems.component';
import { WatercoloursComponent } from './watercolours/watercolours.component';
import { appRoutes } from './routes';
import {BooksService} from './services/books.service';
import {HttpClientModule} from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BooksComponent,
    PoemsComponent,
    WatercoloursComponent,
    BookComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
