import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isLoggedIn = false;
 
  constructor(private authService: AuthService) {}

  ngOnInit() {
    
    this.authService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;      
    }); 

    //get the local
    const token = this.authService.getUserToken();
    const user = this.authService.getUser();
    if (token && user) {
      this.isLoggedIn = true;
    }

 

  }
}
