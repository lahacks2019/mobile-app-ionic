import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { DataService } from './data.service';
import { User } from '../interfaces/_interfaces';

export interface FbUser {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      height: number;
      width: number;
      is_silhouette: boolean;
      url: string;
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = null;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private fb: Facebook,
    private dataService: DataService
  ) { }

  login(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.fb.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
          const { accessToken, userID } = res.authResponse;
          return this.http.get(
            `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`
          )
          .toPromise();
        })
        .then((res: FbUser) => {
          const { id, name, email, picture } = res;
          this.user = {
            id,
            email,
            fbID: name,
            pictureURL: picture.data.url
          };
          return this.dataService.getUser(this.user.id);
        })
        .then((result: User) => {
          if (result) {
            // User exist in our database.
            this.user = Object.assign(result, this.user);
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
      } else {
        // Fake test user.
        this.user = {
          id: '1234567890',
          email: 'john@smith.com',
          fbID: 'John Smith',
          pictureURL: 'http://i.pravatar.cc/100'
        };
        resolve(false);
      }
    });
  }

  signup(additionalInfo: any) {
    this.user = Object.assign(this.user, additionalInfo);
  }
}
