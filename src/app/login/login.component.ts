import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UserGetResponse } from '../model/user_get';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/api/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private http: HttpClient,private route: Router , protected shareData : UserService,private yourService: UserService) {}
  
  async login(email: string, password: string) {
    try {
        console.log(this.yourService.getName,"test1");
        const data = this.yourService.getName() as unknown ;
        console.log(data);
        const users = data as UserGetResponse[];
      
        const foundUser = users.find(user => user.user_email === email && user.user_pass === password);

        if (foundUser) {
           console.log(foundUser);
        } else {
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
}



  

