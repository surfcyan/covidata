import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  dataList = [
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
    { hospitalName: 'Max Hospital', beds: '24', update_datestamp: '24 May 2021', update_timestamp:'3:02AM' },
  ]

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
