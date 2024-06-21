import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private blogService: BlogService,
  ) {}

  ngOnInit() {
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
}
