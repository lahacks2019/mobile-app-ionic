import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  slideOpts = {
    effect: 'flip',
    spaceBetween: 10,
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private platform: Platform,
    private fb: Facebook
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.platform.is('cordova')) {
      this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        const { accessToken, userID } = res.authResponse;
        return this.http.get(
          `https://graph.facebook.com/${userID}?fields=id,name,email,picture&access_token=${accessToken}`
        )
        .toPromise();
      })
      .then((res: HttpResponse<any>) => {
        console.log(res);
        this.router.navigate(['signup']);
      })
      .catch(e => console.log('Error logging into Facebook', e));
    } else {
      this.router.navigate(['signup']);
    }
  }

}
