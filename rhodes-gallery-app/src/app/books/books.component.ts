import { Component, OnInit } from '@angular/core';
import {BooksService} from '../services/books.service';
import {Book} from '../services/dtos';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];
  breakpoint = 1;

  get columns(): number {
    return this.breakpoint;
  }

  constructor(private service: BooksService) { }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : this.books.length / 2;
  }

  ngOnInit() {

    this.service.getBooks()
      .subscribe(x => {
        this.breakpoint = (window.innerWidth <= 400) ? 1 : x.length / 2;
        this.books = x.sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          } else if (a.order > b.order) {
            return 1;
          }

          return 0;
        })
      });
  }

}
