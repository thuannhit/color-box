import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ColorGeneratorService, ColorInterpolate } from './services';
export interface Row {
  id?: number;
  title: string;
  items: Box[];
}
export interface Box {
  name: string;
  color: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  sizeOfBox: number = 8;
  outOfRange: boolean;
  title: string = 'axon-app';
  groups: Row[];
  listOfColorOptions: string[] = Object.getOwnPropertyNames(ColorInterpolate);
  selectedColorOption: string = this.listOfColorOptions[0];

  constructor(private colorGenerator: ColorGeneratorService) { }

  ngOnInit() {
    this.generateTable();
  }

  ngOnDestroy() { }

  dropItem(oEvent: CdkDragDrop<string[]>) {
    if (oEvent.previousContainer === oEvent.container) {
      let oldtarget = oEvent.item.data[oEvent.previousIndex];
      oEvent.item.data[oEvent.previousIndex] =
        oEvent.item.data[oEvent.currentIndex];
      oEvent.item.data[oEvent.currentIndex] = oldtarget;
      // moveItemInArray(oEvent.container.data, oEvent.previousIndex, oEvent.currentIndex);
    } else {
      transferArrayItem(
        oEvent.previousContainer.data,
        oEvent.container.data,
        oEvent.previousIndex,
        oEvent.currentIndex
      );
      transferArrayItem(
        oEvent.container.data,
        oEvent.previousContainer.data,
        oEvent.currentIndex + 1,
        oEvent.previousIndex
      );
    }
  }

  getConnectedList(): any[] {
    return this.groups.map((x) => `${x.id}`);
  }

  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.groups, event.previousIndex, event.currentIndex);
  }

  generateTable() {
    if (this.sizeOfBox < 2 || this.sizeOfBox > 9) {
      this.outOfRange = true;
      return;
    }
    this.outOfRange = false;
    this.groups = [];
    const colors: string[] = this.colorGenerator.generateColors(
      this.sizeOfBox * this.sizeOfBox,
      this.selectedColorOption
    );
    colors.forEach((element, index) => {
      const aBox: Box = {
        color: element,
        name: `column ${Math.floor(index / this.sizeOfBox)} - row ${
          index - Math.floor(index / this.sizeOfBox) * this.sizeOfBox
          }`,
      };
      if (index % this.sizeOfBox === 0) {
        this.groups.push({
          id: Math.floor(index / this.sizeOfBox),
          title: `row ${Math.floor(index / this.sizeOfBox)}`,
          items: [aBox],
        });
      } else {
        this.groups[this.groups.length - 1].items.push(aBox);
      }
    });
  }
}
