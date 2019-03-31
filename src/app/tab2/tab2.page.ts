import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  constructor(private cameraPreview: CameraPreview){}
  picture: String;
  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    tapPhoto: true,
    previewDrag: true,
    toBack: false
  }
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
  ngOnInit(){ 
    // // start camera
    // this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
    //   (res) => {
    //     console.log(res)
    //   },
    //   (err) => {
    //     console.log(err)
    //   });
  }

  _onTakePicture(){
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
    // take a picture
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
  }

  // Set the handler to run every time we take a picture
  // this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
  //   console.log(result);
  //   // do something with the result
  // });

}
