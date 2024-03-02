import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { UserService } from '../services/api/user.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PictureGetResponse } from '../model/picture_get';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Navtop10Component } from "../nav/navtop10/navtop10.component";
@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [NavComponent, Navtop10Component,CommonModule,MatToolbarModule]
})
export class MainComponent {
Picture: PictureGetResponse[] | undefined;

constructor(protected shared : UserService,private http: HttpClient){
  
}
ngOnInit(): void {
  this.getPicture();
  console.log('Init State');    
}


async getPicture() {
const url = 'http://localhost:3000/pictrue/all';
const data = await lastValueFrom(
this.http.get(url));
this.Picture = data as PictureGetResponse[];
console.log(this.Picture);
const randomIndex1 = Math.floor(Math.random() * this.Picture.length);
let randomIndex2 = Math.floor(Math.random() * this.Picture.length);

while (randomIndex2 === randomIndex1) {
  randomIndex2 = Math.floor(Math.random() * this.Picture.length);
}
console.log(randomIndex1);
console.log(randomIndex2);

const randomData1 = this.Picture[randomIndex1];
console.log(randomData1);
const randomData2 = this.Picture[randomIndex2];
console.log(randomData2);
}


}
