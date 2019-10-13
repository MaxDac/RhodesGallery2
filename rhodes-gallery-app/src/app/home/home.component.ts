import { Component, OnInit } from '@angular/core';
import {BiographyService} from "../services/biography.service";
import {Biography} from "../services/dtos";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sections: Biography[];

  constructor(private service: BiographyService) { }

  ngOnInit() {
    this.service.getBooks()
      .subscribe(bs => {
        this.sections = bs.sort((a, b) => {
          if (a > b) {
            return 1;
          } else if (a < b) {
            return -1;
          }

          return 0;
        });
      })
  }

}
