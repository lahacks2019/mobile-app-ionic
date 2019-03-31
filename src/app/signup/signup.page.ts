import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { UserService } from '../user.service';
import { User } from '../../interfaces/_interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('myContent') content: IonContent;
  user: User;
  role: string;
  restaurantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  chooseRole(role: string) {
    this.role = role;
    setTimeout(() => this.content.scrollToBottom(1000), 100);
  }

  signup() {
    this.router.navigate(['dashboard']);
  }

}
