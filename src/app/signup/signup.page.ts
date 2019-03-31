import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { UserService } from '../user.service';
import { User } from '../../interfaces/_interfaces';
import { LoadingController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment
} from '@ionic-native/google-maps';

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
  map: GoogleMap;
  loading: any;
  location: MyLocation;
  permissionGiven = false;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  chooseRole(role: string) {
    this.role = role;
    if (this.role === 'individual') {
      setTimeout(() => this.loadMap(), 10);
    }
    setTimeout(() => this.content.scrollToBottom(1000), 100);
  }

  async signup() {
    if (this.role === 'individual') {
      // Individual
      await this.userService.signup({
        identity: this.role,
        defaultLocation: this.location.latLng.lat + ',' + this.location.latLng.lng,
        rating: 0,
        reviews: 0,
        benefits: 'None'
      });
    } else {
      // Restaurant Owner
    }
    this.router.navigate(['dashboard']);
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAT_w9GPRvUQ28Glmsb1lkYcGawzLhnaHE',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAT_w9GPRvUQ28Glmsb1lkYcGawzLhnaHE'
    });

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
  }

  async onButtonClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      this.permissionGiven = true;
      this.location = location;

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      const marker: Marker = this.map.addMarkerSync({
        title: 'Your Location',
        snippet: 'Thanks! We will use your location to help you give or receive food!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();
    })
    .catch(err => {
      this.loading.dismiss();
      console.error(err);
    });
  }

}
