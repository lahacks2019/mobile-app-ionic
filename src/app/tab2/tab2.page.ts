import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  image: string;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.image = this.imageService.image;
  }

}
