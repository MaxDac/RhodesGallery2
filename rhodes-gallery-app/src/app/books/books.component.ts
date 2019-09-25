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

  constructor(private service: BooksService) { }

  ngOnInit() {
    this.service.getBooks()
      .subscribe(x => this.books = x);
  }

}
