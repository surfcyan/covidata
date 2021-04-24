import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home-parent',
  templateUrl: './home-parent.component.html',
  styleUrls: ['./home-parent.component.scss']
})
export class HomeParentComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  worldActive = 0
  indiaTotalCases = 0

  ngOnInit(): void {
    this.getWorldData();
    this.getIndiaData();
  }

  getWorldData() {
    this._apiService.getTotalWorldCases().subscribe(res => {
      console.log(res)
      this.worldActive = res['cases']
    })
  }

  getIndiaData(){
    this._apiService.getIndiaData().subscribe(res =>{
      console.log(res)
      this.indiaTotalCases = res['cases']
    })
  }

}
