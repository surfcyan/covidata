import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu-options',
  templateUrl: './side-menu-options.component.html',
  styleUrls: ['./side-menu-options.component.scss']
})
export class SideMenuOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  panelOpenState = false;

}
