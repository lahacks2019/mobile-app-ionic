import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
        .then((res: HttpResponse<any>) => {
          console.log(res);
          resolve(false);
        })
        .catch(err => reject(err));
      }
    });
  }
}
