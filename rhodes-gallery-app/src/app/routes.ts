import { Routes } from '@angular/router';
import {PoemsComponent} from './poems/poems.component';
import {WatercoloursComponent} from './watercolours/watercolours.component';
import {BooksComponent} from './books/books.component';
import {HomeComponent} from './home/home.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'poems', component: PoemsComponent },
  { path: 'watercolours', component: WatercoloursComponent },
  { path: 'books', component: BooksComponent }
];
