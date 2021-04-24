import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home-parent',
  templateUrl: './home-parent.component.html',
  styleUrls: ['./home-parent.component.scss']
})
export class HomeParentComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.getWorldData();
    this.getIndiaData();
  }

  worldTotalCases = 0
  worldActiveCases = 0
  indiaTotalCases = 0
  indiaActiveCases = 0

  getWorldData() {
    this._apiService.getTotalWorldCases().subscribe(res => {
      console.log(res)
      this.worldTotalCases = res['cases']
      this.worldActiveCases = res['active']
    })
  }

  getIndiaData() {
    this._apiService.getIndiaData().subscribe(res => {
      console.log(res)
      this.indiaTotalCases = res['cases']
      this.indiaActiveCases = res['active']
    })
  }

}
