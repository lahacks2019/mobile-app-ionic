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
          name,
          description,
          expireDate,
          userID,
          imageURL,
          location
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

  async createUser(user: User) {
    const { data } = await this.apollo.mutate<{ user: User }>({
      mutation: gql`
        mutation CreateUser(
          $id: String!,
          $email: String!,
          $pictureURL: String!,
          $fbID:String!,
          $identity:String!,
          $defaultLocation:String!,
          $rating:Float!,
          $reviews: Int!,
          $benefits: String!
        ) {
          addUser(
            id: $id,
            email: $email,
            pictureURL: $pictureURL,
            fbID: $fbID,
            identity: $identity,
            defaultLocation: $defaultLocation,
            rating: $rating,
            reviews: $reviews,
            benefits : $benefits
          ) {
            id
            email
            pictureUrl
            fbID
            identity
            defaultLocation
            rating
            reviews
            benefits
          }
        }
      `,
      variables: user
    }).toPromise();
    return data.user;
  }

}
