import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

export interface VisionResult {
  isFood: boolean;
  tags: string[];
  guess: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  image: string;
  results: string[];
  guess: string;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  uploadImage(image: string) {
    return new Promise((resolve, reject) => {
      const userID = this.userService.user.id;
      this.http.post('https://cors-anywhere.herokuapp.com/https://lahacks-236121.appspot.com/uploadImage', {
        userID: userID,
        image: image
      }).toPromise()
      .then((result: VisionResult) => {
        if (result.isFood) {
          this.image = image;
          this.results = result.tags;
          this.guess = result.guess.split(' ')[0] || '';
          resolve(result);
        } else {
          throw new Error('This is not a picture of food!');
        }
      })
      .catch(err => reject(err));
    });
  }
}
