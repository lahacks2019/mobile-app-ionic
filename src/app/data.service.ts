import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/_interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apollo: Apollo) { }

  async getItems(): Promise<Item[]> {
    const { data } = await this.apollo.query<{ items: Item[] }>({
      query: gql`query {
        items {
          id,
          name,
          description,
          expireDate,
          userID,
          imageURL,
          location,
        }
      }`
    }).toPromise();
    return data.items;
  }
}
