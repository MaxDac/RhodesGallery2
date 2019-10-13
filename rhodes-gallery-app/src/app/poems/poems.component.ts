import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {PoemsService} from '../services/poems.service';
import 'rxjs-compat/add/operator/mergeMap';
import {Poem, PoemFormatted, PoemType} from '../services/dtos';

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css']
})
export class PoemsComponent implements OnInit {

  constructor(private service: PoemsService) {}

  poems: PoemFormatted[];

  private static formatText(text: string): string {
    console.log(`Text: ${text}`);
    const replaced = text.split('\n').join('<br />');
    console.log(`Replaced: ${replaced}`);
    return replaced;
  }

  ngOnInit() {
    this.service.getAllPoems()
      .subscribe(x => {
        this.poems = x.map(p => {
          const returnValue: PoemFormatted = {
            id: p.id,
            code: p.code,
            name: p.name,
            poemText: p.poemText,
            poemTypeId: p.poemTypeId,
            poemFormatted: PoemsComponent.formatText(p.poemText)
          };
          return returnValue;
        });
      });
  }

}
