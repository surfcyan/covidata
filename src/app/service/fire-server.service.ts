import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  postNewValue(addr: string, obj: object) {
    return this._fireStore.collection(addr).doc(uuid.v4()).set(obj)
  }

}
