import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FireServerService {

  constructor(private _fireStore: AngularFirestore) { }

  getValue(addr: string): Observable<any> {
    return this._fireStore.collection<any>(addr, ref => ref.orderBy('update_timestamp', 'desc')).valueChanges();
  }

  postNewValue(addr: string, obj: any) {
    return this._fireStore.collection(addr).doc(obj.id).set(obj)
  }

  postUpvote(addr: string, id: string) {
    return this._fireStore.collection(addr).doc(id).update({
      upvote: firebase.firestore.FieldValue.increment(1)
    })
  }
  postDownvote(addr: string, id: string) {
    return this._fireStore.collection(addr).doc(id).update({
      downvote: firebase.firestore.FieldValue.increment(-1)
    })
  }
  postOxyHospaUpdate(addr: string, obj: any) {
    return this._fireStore.collection(addr).doc(obj.id).update({
      beds: obj.beds
    })
  }
  getOxyHospitalByKeyword(addr: string, keyword: string): Observable<any> {
    return this._fireStore.collection<any>(addr, ref => ref.orderBy('hospitalName_no_case').where('hospitalName_no_case', '>=', keyword.toLowerCase())).valueChanges();
  }
  getOxyHospitalByState(addr: string, state: string): Observable<any> {
    return this._fireStore.collection<any>(addr, ref => ref.where('state', '==', state)).valueChanges();
  }
  getOxyHospitalByCity(addr: string, state: string, city: string): Observable<any> {
    return this._fireStore.collection<any>(addr, ref => ref.where('state', '==', state).where('city', '==', city)).valueChanges();
  }

}
