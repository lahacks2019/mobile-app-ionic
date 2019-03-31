import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  image: string;
  lastResult: string;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  uploadImage(image: string) {
    return new Promise((resolve, reject) => {
      const userID = this.userService.user.id;
      this.http.post('https://lahacks-236121.appspot.com/uploadImage', {
        userID: userID,
        image: image
      }).toPromise()
      .then((result: string) => {
        this.lastResult = result;
        resolve(result);
      })
      .catch(err => reject(err));
    });
  }
}
