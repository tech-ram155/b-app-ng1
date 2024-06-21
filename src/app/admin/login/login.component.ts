import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg = "";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {} 

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value as UserLogin;
      this.authService.onLogin(formValues).subscribe(
        res => {
          //console.log(res.token);
          this.authService.setUserData(res.token,res.user);
          this.loginForm.reset();
          this.authService.setLoggedIn(true);
          this.router.navigate(['/admin/dashboard']);
        },
        err => {
          console.error(err);
          this.errorMsg = "User Name and Password is not correct"
          // Handle error response, show error messages, etc.
        }
      );
    } else {
      //console.log('Form is invalid');
    }
  }
}
