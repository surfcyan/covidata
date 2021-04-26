import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private _bottomSheet: MatBottomSheet, private _fireServer: FireServerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.filterApplied = false;
    this.enableMessageScreen(false);
    this._fireServer.getValue('covidata/oxygen/hospital').subscribe(res => {
      this.dataList = []
      for (const e in res) {
        res[e].update_timestamp = res[e].update_timestamp.toDate()
        res[e].date = moment(res[e].update_timestamp).format('Do MMMM YYYY')
        res[e].time = moment(res[e].update_timestamp).format('h:mm a')
        this.dataList.push(res[e])
      }
      if (this.dataList.length == 0)
        this.enableMessageScreen(true, 'No Data Yet! Please wait for someone or add yourself')
    })
  }

  dataList: any[] = []
  showMessage: boolean = false;
  message: string = '';
  filterApplied: boolean = false;

  // { hospitalName: 'Max Hospital', beds: 24, update_datestamp: '24 May 2021', update_timestamp: '3:02AM' },

  addOxyHospital(): void {
    this._bottomSheet.open(BottomSheetAddOxyHospital, { data: { edit: false } });
  }

  downVote(id: string) {
    this._fireServer.postDownvote('covidata/oxygen/hospital', id).then(res => {
      console.log(res)
    })
  }
  upVote(id: string) {
    this._fireServer.postUpvote('covidata/oxygen/hospital', id).then(res => {
      console.log(res)
    })
  }

  getBgColor(up: number, down: number) {
    var g = ((up + down) / up) * 255
    var b = ((up + down) / up) * 255
    return `rgb(255,${g},${b})`
  }

  editEntry(item: any) {
    this._bottomSheet.open(BottomSheetAddOxyHospital, { data: { edit: true, meta: item } });
  }

  openFilterSheet() {
    const btSheetRef = this._bottomSheet.open(BottomSheetApplyFilter, { data: { description: 'data field' } });
    btSheetRef.afterDismissed().subscribe(res => {
      if (res) {
        this.dataList = [];
        this.filterApplied = true;
        for (const e in res)
          this.dataList.push(res[e])
        if (this.dataList.length == 0)
          this.enableMessageScreen(true, 'Sorry, No Results Found!');
      }

    })
  }

  enableMessageScreen(bool: boolean, msg: string = '') {
    this.showMessage = bool;
    this.message = msg
    if (msg)
      this.openSnackBar(msg)
  }

  openSnackBar(msg: string, btn: string = 'Done') {
    this._snackBar.open(msg, btn)
  }

}
@Component({
  selector: 'bottom-sheet-oxy-hospital',
  templateUrl: 'add-oxy-hospital.component.html',
})
export class BottomSheetAddOxyHospital {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetAddOxyHospital>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _apiService: ApiService,
    private _fireServer: FireServerService,
    private _snackBar: MatSnackBar) {
    console.log(data)
    if (data.edit) {
      this.DATA = data['meta']
      this.editing = true;
      this.formDet.patchValue({ hosp_name: data.meta.hospitalName })
    }
  }

  DATA: any;
  editing = false;
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

  submit(): any {

    if (!this.editing) {
      var obj = {
        id: uuid.v4(),
        hospitalName: this.formDet.value.hosp_name,
        hospitalName_no_case: (this.formDet.value.hosp_name).toLowerCase(),
        beds: this.formDet.value.beds,
        downvote: 0,
        upvote: 0,
        update_timestamp: new Date(),
        state: this.formDet.value.state,
        city: this.formDet.value.city,
      }

      if (this.formDet.value.hosp_name == '' || this.formDet.value.beds == '' || this.formDet.value.state == '' || this.formDet.value.city == '') {
        this.openSnackBar('Please Fill All Details!');
        return 0;
      }

      this._fireServer.postNewValue('covidata/oxygen/hospital', obj).then(res => {
        console.log(res)
        this.close(true, 'Hospital Added Successfully!')
      })
    } else {
      var editObj = {
        id: this.DATA.id,
        beds: this.formDet.value.beds,
      }

      if (this.formDet.value.beds == '') {
        this.openSnackBar('Please Fill All Details!');
        return 0;
      }

      this._fireServer.postOxyHospaUpdate('covidata/oxygen/hospital', editObj).then(res => {
        console.log(res)
        this.close(true, 'Beds Updated Successfully!')
      })
    }
  }
  close(msgFlag: boolean = false, msg: string = '') {
    if (msgFlag)
      this.openSnackBar(msg)
    this._bottomSheetRef.dismiss()
  }
  openSnackBar(msg: string, btn: string = 'Done') {
    this._snackBar.open(msg, btn)
  }

}

@Component({
  selector: 'bottom-sheet-filter',
  templateUrl: 'apply-filter.component.html',
})
export class BottomSheetApplyFilter {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetApplyFilter>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _apiService: ApiService,
    private _fireServer: FireServerService) {
    console.log(data)
  }

  ngOnInit() {
    this._apiService.getStates().subscribe(res => {
      for (const e in res['states']) {
        this.states.push({ state: res['states'][e]['name'], cities: res['states'][e]['districts'] })
      }
    })
  }

  states: any[] = []
  cities: any[] = []
  formDet = new FormGroup({
    keyword: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
  })

  stateChanged(e: any) {
    this.cities = []
    for (const r in this.states)
      if (this.states[r].state == e.value)
        for (const i in this.states[r].cities)
          this.cities.push(this.states[r].cities[i])
  }

  submit() {
    var list: any = []

    // this._fireServer.getOxyHospitalByKeyword('covidata/oxygen/hospital', this.formDet.value.keyword).subscribe(resp => {
    //   list = []
    //   console.log(resp)
    //   for (const e in resp)
    //     list.push(resp[e])
    //   console.log('list', list)
    //   this._bottomSheetRef.dismiss(list)
    // })

    if (this.formDet.value.city == '' && this.formDet.value.state != '')
      this._fireServer.getOxyHospitalByState('covidata/oxygen/hospital', this.formDet.value.state).subscribe(resp => {
        list = []
        for (const e in resp)
          list.push(resp[e])
        this._bottomSheetRef.dismiss(list)
      })

    if (this.formDet.value.city != '' && this.formDet.value.state != '')
      this._fireServer.getOxyHospitalByCity('covidata/oxygen/hospital', this.formDet.value.state, this.formDet.value.city).subscribe(resp => {
        list = []
        for (const e in resp)
          list.push(resp[e])
        this._bottomSheetRef.dismiss(list)
      })

  }

  close() {
    this._bottomSheetRef.dismiss()
  }

}