import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Blog } from '../../../models/blog';
import { BlogService } from '../../../services/blog.service';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [],
  templateUrl: './drafts.component.html',
  styleUrl: './drafts.component.css'
})
export class DraftsComponent implements OnInit ,AfterViewInit{
  blogs: Blog[] = [];
  filterBlog: Blog[] = [];
  apiUrl = 'http://localhost:3000';

constructor(
  private blogService:BlogService,
  private dashboardComponent: DashboardComponent
){}


ngOnInit(): void {
this.getBlogs()

}
ngAfterViewInit(): void {
  
}
getBlogs() {
  this.blogService.getAllBlogs().subscribe((blogs: Blog[]) => {
    this.blogs = blogs; 
    this.filterBlog = this.blogs.filter((blog) => blog.status === "Draft");
  });
}

getImageUrl(blog: Blog): string {
  // console.log(blog.featuredImage);    
   return `${this.apiUrl}/${blog.featuredImage}`;
 }

 onClickDelete(blogId: any) {
   this.blogService.deleteBlog(blogId).subscribe((res) => {
     console.log(res);
   });
   this.getBlogs();
 }

 onClickEdit(blogId: string) {
   this.dashboardComponent.loadComponent('CreateBlog', { blogId });
 }

}
