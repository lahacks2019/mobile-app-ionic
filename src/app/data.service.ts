import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

const getItems = gql`
  query {
    items{
      id,
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apollo: Apollo) { }

  async getItems() {
    const { data } = await this.apollo.query<any>({ query: getItems }).toPromise();
    return data.items;
  }
}
