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
  constructor(private http: HttpClient,private route: Router , protected shareData : UserService,private yourService: UserService) {
  }
  

  
  async login(email: string, password: string) {
    const url = 'http://localhost:3000/users';
    try {
      const data = await this.http.get(url).toPromise();
      const users = data as UserGetResponse[];
      const foundUser = users.find(user => user.user_email === email && user.user_pass === password);

      if (foundUser) {
        console.log("User found:", foundUser);
        if (password === foundUser.user_pass) {
          localStorage.setItem("userID", JSON.stringify(foundUser.user_id));
          console.log("Session ID : " + foundUser.user_id + " is set on LocalStorage");
          this.navigateTomain(); // Navigate to 'main' route
        } else {
          alert("รหัสผ่านไม่ถูกต้อง");
        }
      } else {
        alert("ไม่มีผู้ใช้นี้อยู่ในระบบ โปรดสมัครสมาชิก");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  navigateTomain() {
    this.route.navigate(['/main']);
  }
}



  

