import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import * as moment from 'moment';
import { oxyHospital } from 'src/app/models/oxygen.models';
import { ApiService } from 'src/app/service/api.service';
import { FireServerService } from 'src/app/service/fire-server.service';
import * as uuid from 'uuid';

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
        res[e].update_timestamp = res[e].update_timestamp.toDate()
        res[e].date = moment(res[e].update_timestamp).format('Do MMMM YYYY')
        res[e].time = moment(res[e].update_timestamp).format('h:mm a')
        this.dataList.push(res[e])
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
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetAddOxyHospital>, private _apiService: ApiService, private _fireServer: FireServerService) { }

  states: any[] = []
  cities: any[] = []
  formDet = new FormGroup({
    hosp_name: new FormControl(''),
    beds: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
  })

  ngOnInit() {
    this._apiService.getStates().subscribe(res => {
      for (const e in res['states']) {
        this.states.push({ state: res['states'][e]['name'], cities: res['states'][e]['districts'] })
      }
    })
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  stateChanged(e: any) {
    this.cities = []
    for (const r in this.states)
      if (this.states[r].state == e.value)
        for (const i in this.states[r].cities)
          this.cities.push(this.states[r].cities[i])
  }

  submit() {

    var obj = {
      id: uuid.v4(),
      hospitalName: this.formDet.value.hosp_name,
      beds: this.formDet.value.beds,
      downvote: 0,
      upvote: 0,
      update_timestamp: new Date(),
      state: this.formDet.value.state,
      city: this.formDet.value.city,
    }

    this._fireServer.postNewValue('covidata/oxygen/hospital', obj).then(res => {
      console.log(res)
    })
  }

}
