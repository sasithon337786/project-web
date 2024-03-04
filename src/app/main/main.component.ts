import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { UserService } from '../services/api/user.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PictureGetResponse } from '../model/picture_get';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Navtop10Component } from '../nav/navtop10/navtop10.component';
import { UserGetResponse } from '../model/user_get';
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
  
  constructor(protected shared: UserService, private http: HttpClient) {}
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
  }

  check(p_id: number) {
    if (this.Picture !== undefined) {
      const currentTime: Date = new Date();
      const voteTimestamp: string = currentTime
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      ) as UserGetResponse;
      if (currentUser === null) {
        const machineIdString = window.navigator.userAgent;
        const machineIdNumber = parseInt(machineIdString, 10);
        const currentUserDefault: UserGetResponse = {
          user_id: machineIdNumber,
          name: function (name: any): unknown {
            throw new Error('Function not implemented.');
          },
          user_email: '',
          user_pass: '',
          user_type: 0,
          user_pictrue: '',
          user_name: '',
          user_age: null,
          user_gender: null,
          user_preference: null,
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUserDefault));
      }
      if (p_id === this.Picture[0].pictrue_id) {
        const body = {
          vote_timestamp: voteTimestamp,
          vote_point1: this.Picture[0].pictrue_p,
          vote_point2: this.Picture[1].pictrue_p,
          pt_id1: this.Picture[0].pictrue_id,
          pt_id2: this.Picture[1].pictrue_id,
          u_id: currentUser.user_id,
        };
        const url = 'http://localhost:3000/vote/vote';
        this.http.post(url, body).subscribe((response) => {
          console.log(response);
        });
        console.log('1');
        this.getPicture();
      } else {
        const body = {
          vote_timestamp: voteTimestamp,
          vote_point1: this.Picture[1].pictrue_p,
          vote_point2: this.Picture[0].pictrue_p,
          pt_id1: this.Picture[1].pictrue_id,
          pt_id2: this.Picture[0].pictrue_id,
          u_id: currentUser.user_id,
        };
        const url = 'http://localhost:3000/vote/vote';
        this.http.post(url, body).subscribe((response) => {
          console.log(response);
        });
        console.log('2');
        this.getPicture();
      }
    }
  }
}
