import { Injectable } from '@angular/core';
import { Collections } from '../model/enums/collections.enum';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collection: Collections = Collections.Users;

  constructor(private db: DataService) { }

  create(documentId: string, newObject: any)
  {
    this.db.setDocument(this.collection, documentId, newObject);
  }

}