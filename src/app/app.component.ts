import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./admin/login/login.component";
import { HeaderComponent } from "./user/header/header.component";
import { BlogListComponent } from "./admin/dashboard/blog-list/blog-list.component";
import { BlogsComponent } from "./bloging/blogs/blogs.component";
import { FooterComponent } from "./user/footer/footer.component";
import { BlogDetailsComponent } from "./bloging/blog-details/blog-details.component";
import { CreateBlogComponent } from "./admin/dashboard/create-blog/create-blog.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent, HeaderComponent, BlogListComponent, BlogsComponent,CommonModule, FooterComponent, BlogDetailsComponent, CreateBlogComponent, DashboardComponent]
})
export class AppComponent implements OnInit {
  //isLoggedIn = false;
 
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.authService.isLoggedIn.subscribe(value => {
    //   this.isLoggedIn = value;      
    // });
  }
}
