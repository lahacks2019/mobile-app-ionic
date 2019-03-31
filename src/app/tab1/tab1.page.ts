import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data = [
    {
    username: 'User Name',
    avatar: '/assets/shapes.svg',
    foodPicture: '/assets/shapes.svg',
    datePosted: '10 mins ago',
    location:  '1 mile away'
    },
    {
      username: 'User Name',
      avatar: '/assets/shapes.svg',
      foodPicture: '/assets/shapes.svg',
      datePosted: '10 mins ago',
      location:  '1 mile away'
    },
    {
      username: 'User Name',
      avatar: '/assets/shapes.svg',
      foodPicture: '/assets/shapes.svg',
      datePosted: '10 mins ago',
      location:  '1 mile away'
    }
  ]
}
