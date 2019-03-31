import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LoadingController } from '@ionic/angular';
import { PopupService } from '../popup.service';

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
    private router: Router,
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private popupService: PopupService
  ) { }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...'
    });
    loading.present();
    try {
      const isExistingUser = await this.userService.login();
      loading.dismiss();
      if (isExistingUser) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['signup']);
      }
    } catch (e) {
      loading.dismiss();
      console.error(e);
      this.popupService.alert(JSON.stringify(e));
    }
  }

}
