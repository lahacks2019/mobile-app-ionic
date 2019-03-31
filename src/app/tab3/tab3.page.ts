import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { Item } from '../../interfaces/_interfaces';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  postData: Item[] = [];

  constructor(private dataService: DataService, private userService: UserService) {}

  ngOnInit() {
    this.dataService.getItems()
    .then(response =>  {
      console.log(response);
      this.postData = response.filter(item => {
        return item.userID === this.userService.user.id;
      });
    });
  }

  doRefresh(event: any) {
    this.dataService.getItems()
    .then(response =>  {
      console.log(response);
      this.postData = response.filter(item => {
        return item.userID === this.userService.user.id;
      });
    });
  }
}
