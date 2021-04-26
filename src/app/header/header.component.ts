import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  leftIcon = 'menu'

  @Output() newItemEvent = new EventEmitter();

  openMenu() {
    this.newItemEvent.emit()
    // this.leftIcon=='menu'?this.leftIcon='arrow_back_ios':this.leftIcon='menu'
  }

}
