import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import * as moment from 'moment';
import { HOSPITAL } from 'src/app/models/oxygen.models';
import { FireServerService } from 'src/app/service/fire-server.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet, private _fireServer: FireServerService) { }

  ngOnInit(): void {
    this._fireServer.getValue('covidata/oxygen/hospital').subscribe(res => {
      this.dataList = []
      for (const e in res) {
        console.log(res[e])
        res[e].update_timestamp = res[e].update_timestamp.toDate()
        res[e].date = moment(res[e].update_timestamp).format('Do MMMM YYYY')
        res[e].time = moment(res[e].update_timestamp).format('h:mm a')
        this.dataList.push(res[e])
        console.log(res[e].update_timestamp)
      }
    })
  }

  dataList: any[] = []

  // { hospitalName: 'Max Hospital', beds: 24, update_datestamp: '24 May 2021', update_timestamp: '3:02AM' },

  addOxyHospital(): void {
    this._bottomSheet.open(BottomSheetAddOxyHospital);
  }

}
@Component({
  selector: 'bottom-sheet-oxy-hospital',
  templateUrl: 'add-oxy-hospital.component.html',
})
export class BottomSheetAddOxyHospital {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetAddOxyHospital>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
