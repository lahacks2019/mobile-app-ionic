import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
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
    private fb: Facebook
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
            pictureUrl: picture.data.url
          };
          resolve(false);
        })
        .catch(err => reject(err));
      } else {
        resolve(false);
      }
    });
  }
}
