import { Component, OnInit } from '@angular/core';

export class CarouselElement {
  imageUrl: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  selected = 0;
  timer: any;

  elements: CarouselElement[] = [
    {
      imageUrl: '../../assets/images/home-1.png'
    },
    {
      imageUrl: '../../assets/images/home-2.png'
    }
  ];

  maxSelected = this.elements.length - 1;

  constructor() { }

  ngOnInit() {
    this.timer = setInterval(this.switchSelected(this.selected, this.maxSelected), 5000);
  }

  private switchSelected(selected: number, maxSelected: number) {
    return () => {
      console.log(`max elements: ${maxSelected}`);
      console.log(`current selected: ${selected}`);
      if (selected === maxSelected) {
        console.log('return to 0');
        selected = 0;
      } else {
        selected = selected + 1;
        console.log(`switched to ${selected}`);
      }
    };
  }

}
