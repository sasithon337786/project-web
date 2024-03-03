import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { UserService } from '../services/api/user.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PictureGetResponse } from '../model/picture_get';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Navtop10Component } from '../nav/navtop10/navtop10.component';
@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [NavComponent, Navtop10Component, CommonModule, MatToolbarModule],
})
export class MainComponent {
  Picture: PictureGetResponse[] | undefined;
  lastRandomData1: any;
  lastRandomData2: any;

  constructor(public shared: UserService, private http: HttpClient) {
    console.log("id: ",this.shared.userData);
  }
  ngOnInit(): void {
    this.getPicture();
    console.log('Init State');
  }

  async getPicture() {
    let lastRandomIndex1: number | null = null;
    let lastRandomIndex2: number | null = null;
    let lastRandomData1: any;
    let lastRandomData2: any;
    let lastRandomTime: number | null = null;

    const url = 'http://localhost:3000/pictrue/all';
    const data = await lastValueFrom(this.http.get(url));
    this.Picture = data as PictureGetResponse[];
    console.log(this.Picture);
    const currentTime = new Date().getTime();

    if (!lastRandomTime || currentTime - lastRandomTime >= 10000) {
      let randomIndex1 = Math.floor(Math.random() * this.Picture.length);
      let randomIndex2 = Math.floor(Math.random() * this.Picture.length);

      while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * this.Picture.length);
      }

      lastRandomIndex1 = randomIndex1;
      lastRandomIndex2 = randomIndex2;
      lastRandomData1 = this.Picture[randomIndex1];
      lastRandomData2 = this.Picture[randomIndex2];
      lastRandomTime = currentTime;

      console.log(lastRandomIndex1, lastRandomIndex2);
      console.log(lastRandomData1, lastRandomData2);
    } else {
      let randomIndex1 = Math.floor(Math.random() * this.Picture.length);
      let randomIndex2 = Math.floor(Math.random() * this.Picture.length);

      while (
        randomIndex1 === lastRandomIndex1 ||
        randomIndex2 === lastRandomIndex2 ||
        randomIndex2 === randomIndex1
      ) {
        randomIndex2 = Math.floor(Math.random() * this.Picture.length);
      }

      lastRandomIndex1 = randomIndex1;
      lastRandomIndex2 = randomIndex2;
      lastRandomData1 = this.Picture[randomIndex1].pictrue_url;
      lastRandomData2 = this.Picture[randomIndex2].pictrue_url;

      console.log(lastRandomIndex1, lastRandomIndex2);
      console.log(lastRandomData1, lastRandomData2);
    }
  }
  
}
