import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { ImageService } from '../image.service';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    private router: Router,
    private camera: Camera,
    public loading: LoadingController,
    private imageService: ImageService,
    private popupService: PopupService
  ) { }

  async takePicture() {
    let loading;
    try {
      const image = await this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      });
      loading = await this.loading.create({
        message: 'Analyzing picture...',
        spinner: 'circles'
      });
      loading.present();
      setTimeout(() => {
        throw new Error('Request Timeout');
      }, 15000);
      await this.imageService.uploadImage('data:image/jpeg;base64,' + image);
      loading.dismiss();
      this.router.navigate(['tab2']);
    } catch (e) {
      loading.dismiss();
      console.error(e);
      this.popupService.alert(JSON.stringify(e));
    }
  }
}
