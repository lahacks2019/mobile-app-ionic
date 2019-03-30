import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private http: HttpClient, private fb: Facebook) { }

  ngOnInit() {
  }

  login() {
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
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

}
