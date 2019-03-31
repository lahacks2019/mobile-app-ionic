import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { ImageService } from '../image.service';
import { PopupService } from '../popup.service';
import { Item } from '../../interfaces/_interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  image: string;
  tags: string[];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    expireDate: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private dataService: DataService,
    private userService: UserService,
    private imageService: ImageService,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    this.image = this.imageService.image;
    this.tags = this.imageService.results;
    this.form.patchValue({ name: this.imageService.guess });
  }

  async post() {
    const loading = await this.loadingCtrl.create({
      message: 'Posting...'
    });
    loading.present();
    try {
      const item: Item = {
        id: Math.random().toString(36).substr(2, 9),
        name: this.form.value.name,
        description: this.form.value.description,
        expireDate: this.form.value.expireDate.slice(0, 10),
        imageURL: 'x',
        userID: this.userService.user.id,
        location: this.userService.user.defaultLocation
      };
      await this.dataService.createItem(item);
      loading.dismiss();
      this.router.navigate(['dashboard', 'tab1']);
    } catch (e) {
      console.error(e);
      loading.dismiss();
      this.popupService.alert(JSON.stringify(e));
    }
  }

}
