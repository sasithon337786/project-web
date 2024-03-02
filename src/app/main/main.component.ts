import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { UserService } from '../services/api/user.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

constructor(protected shared : UserService){
  
}



}
