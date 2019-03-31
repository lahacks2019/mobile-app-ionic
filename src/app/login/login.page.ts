import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login() {
    this.userService.login()
    .then((isExistingUser: boolean) => {
      if (isExistingUser) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['signup']);
      }
    })
    .catch(err => console.error(err));
  }

}
