import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../../interfaces/_interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  postData = [];
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
  ];
  constructor(private dataService: DataService){}

  ngOnInit(){
    this.dataService.getItems()
    .then(response =>  {
      console.log(response);
      this.postData = response;
    })
  }
}
