import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFirestore) { }

  getAll(collectionName: string): Observable<DocumentChangeAction<any>[]> {
    return this.db.collection(collectionName).snapshotChanges();
  }


  update(collectionName: string, documentId: string, object: any) {
    return this.db.collection(collectionName).doc(documentId).update(object);
  }

  delete(collectionName: string, documentId: string) {
    return this.db.collection(collectionName).doc(documentId).delete();
  }

  create(collectionName: string, object: any) {
    return this.db.collection(collectionName).add(Object.assign({}, object));
  }

  getOne(collectionName: string, documentId: string) {
    return this.db.collection(collectionName).doc(documentId).get();
  }

  setData(collectionName: string, documentId: string, data: any) {
    return this.db.collection(collectionName).doc(documentId).set(Object.assign({}, data));
  }


  setDocument(collectionName: string, documentId: string, newObject: any)
  {
    return this.db.collection(collectionName).doc(documentId).set(newObject);
  }

  getAll2(collectionName: string): Observable<any[]> {
    return this.db.collection(collectionName, ref => ref.orderBy('score', 'desc')).valueChanges();
  }

  getOne2(collectionName: string, documentId: string): Observable<any> {
    return this.db.collection(collectionName).doc(documentId).valueChanges();
  }
  
}