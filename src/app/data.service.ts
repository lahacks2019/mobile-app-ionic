import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Item, User } from '../interfaces/_interfaces';

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
          name
        }
      }`
    }).toPromise();
    return data.items;
  }

  async getUser(id: string): Promise<User> {
    const { data } = await this.apollo.query<{ user: User }>({
      query: gql`query {
        user(id:"${id}") {
          id,
          email
        }
      }`
    }).toPromise();
    return data.user;
  }
}
