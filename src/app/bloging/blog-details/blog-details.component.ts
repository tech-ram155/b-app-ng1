import {  Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../models/blog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit  {

  blogId: string | null = null;
  blog: Blog | any = []; 
  getRelatedblog: Blog[] = []; 
  apiUrl = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) {}

  ngOnInit() {
    this.relatedBlog()
    // Get the blog ID from the URL parameters
    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('id');
      if (this.blogId) {
        this.blogService.getBlogById(this.blogId).subscribe((res: Blog) => {
          this.blog = res; 
        });
      }
    });
  }
  getImage(blog: Blog) {
    return this.blogService.getImageUrl(blog)
   }

   relatedBlog(){
    this.blogService.getAllBlogs().subscribe(
      res =>{
      this.getRelatedblog = res.filter(blogs=>blogs.category === this.blog.category).slice(0,3)
      },
      err =>{
        console.log(err);
        
      }
    )
   }
   rlblogsImgUrl(relatedBlog:Blog){
   return this.blogService.getImageUrl(relatedBlog) 
   }

}
