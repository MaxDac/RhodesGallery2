import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {PoemsService} from '../services/poems.service';
import 'rxjs-compat/add/operator/mergeMap';
import {Poem, PoemType} from '../services/dtos';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface TypeNode {
  name: string;
  children?: Poem[];
}

interface CallResult {
  types: PoemType[];
  poems: Poem[];
}

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [
//       {name: 'Apple'},
//       {name: 'Banana'},
//       {name: 'Fruit loops'},
//     ]
//   }, {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [
//           {name: 'Broccoli'},
//           {name: 'Brussel sprouts'},
//         ]
//       }, {
//         name: 'Orange',
//         children: [
//           {name: 'Pumpkins'},
//           {name: 'Carrots'},
//         ]
//       },
//     ]
//   },
// ];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css']
})
export class PoemsComponent implements OnInit {

  constructor(private service: PoemsService) {
  }

  // tslint:disable-next-line:variable-name
  private _transformer: (TypeNode, number) => any;

  treeControl: FlatTreeControl<ExampleFlatNode>;

  treeFlattener: MatTreeFlattener;

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  private treeData() {
    return this.service.getTypes()
      .flatMap(t => this.service.getAllPoems()
        .map(ps => {
          return t.map(tt => {
              return {
                name: tt.code,
                children: ps.filter(pss => pss.poemTypeId === tt.id)
              };
            }
          );
        })
      );
  }

  ngOnInit() {
    this.treeData()
      .subscribe(x => {
        this.dataSource.data = x;
        this._transformer = (node: TypeNode, level: number) => {
          return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level,
          };
        };

        this.treeControl = new FlatTreeControl<ExampleFlatNode>(
          node => node.level, node => node.expandable);

        this.treeFlattener = new MatTreeFlattener(
          this._transformer, node => node.level, node => node.expandable, node => node.children
        );
      });
  }

}
