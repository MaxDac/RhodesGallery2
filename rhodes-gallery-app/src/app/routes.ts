import { Routes } from '@angular/router';
import {PoemsComponent} from './poems/poems.component';
import {WatercoloursComponent} from './watercolours/watercolours.component';
import {BooksComponent} from './books/books.component';
import {CarouselComponent, CarouselElement} from './carousel/carousel.component';

export const appRoutes: Routes = [
  { path: '', component: CarouselComponent, pathMatch: 'full' },
  { path: 'poems', component: PoemsComponent },
  { path: 'watercolours', component: WatercoloursComponent },
  { path: 'books', component: BooksComponent }
];
