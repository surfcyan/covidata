import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("drawer", { static: true }) public matDrawer: MatDrawer | any;

  constructor() { }

  showFiller = false;

  addItem() {
    this.matDrawer.toggle();
  }

}
