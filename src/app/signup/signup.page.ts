import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('myContent') content: IonContent;
  role: string;
  restaurantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  chooseRole(role: string) {
    this.role = role;
    setTimeout(() => this.content.scrollToBottom(1000), 100);
  }

  signup() {
    this.router.navigate(['dashboard']);
  }

}
