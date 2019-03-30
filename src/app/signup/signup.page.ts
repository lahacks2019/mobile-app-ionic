import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('myContent') content: IonContent;
  role: string;

  constructor() { }

  ngOnInit() {
  }

  chooseRole(role: string) {
    this.role = role;
    setTimeout(() => this.content.scrollToBottom(1000), 100);
  }

}
