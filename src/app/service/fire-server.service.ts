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
    return this._fireStore.collection(addr).valueChanges();
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

}
