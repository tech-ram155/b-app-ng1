import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '../../search/search.component';
import { BlogCategoryLinkComponent } from '../blog-category-link/blog-category-link.component';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { Blog } from '../../models/blog';
import { PaginationComponent } from '../pagination/pagination.component';


@Component({
  selector: 'blogs',
  standalone: true,
  imports: [SearchComponent,BlogCategoryLinkComponent,CommonModule,PaginationComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit, AfterViewInit  {
   
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];

  constructor(
    private router: Router,
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.getBlogs();
  }

  ngAfterViewInit(): void {
    this.blogService.selectedCategory$.subscribe((category) => {
      if (category && category.toLowerCase() !== 'all') {
        this.filteredBlogs = this.blogs.filter((blog) => blog.category === category && blog.status === "Published");
      } else {
        this.filteredBlogs = this.blogs.filter((blog) => blog.status === "Published");
      }
    });
  }

    getBlogs() {
     this.blogService.getAllBlogs().subscribe((blogs: Blog[]) => {
    this.blogs = blogs;
       this.filteredBlogs = this.blogs.filter((blog) => blog.status === "Published");
    });
  }

  getBlogDetails(blogId: string) {
    this.router.navigate([`blog-details/${blogId}`]);
  }

  getImage(blog: Blog) {
    return this.blogService.getImageUrl(blog);
  }
}