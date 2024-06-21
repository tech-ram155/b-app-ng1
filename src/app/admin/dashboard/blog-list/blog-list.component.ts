import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog';
import { DashboardComponent } from '../dashboard.component';
import { BlogCategoryLinkComponent } from '../../../bloging/blog-category-link/blog-category-link.component';

@Component({
  selector: 'blog-list',
  standalone: true,
  imports: [BlogCategoryLinkComponent],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogListComponent implements OnInit {
  apiUrl = 'http://localhost:3000';
  allBlogs: Blog[] = [];
  filteredBlogs: Blog[] = [];

  constructor(
    private blogService: BlogService,
    private dashboardComponent: DashboardComponent,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBlogs();
    this.blogService.selectedCategory$.subscribe((category) => {
      if (category && category.toLowerCase() !== 'all') {
        this.filteredBlogs = this.allBlogs.filter(
          (blog) => blog.category === category && blog.status === 'Published'
        );
      } else {
        this.filteredBlogs = this.allBlogs.filter(
          (blog) => blog.status === 'Published'
        );
      }
      this.cd.markForCheck();
    });
  }

  getBlogs() {
    this.blogService.getAllBlogs().subscribe((blogs: Blog[]) => {
      this.allBlogs = blogs;
      this.filteredBlogs = this.allBlogs.filter(blog=> blog.status === 'Published');
      this.cd.markForCheck(); // Ensure change detection runs after data is fetched
    });
  }

  getImageUrl(blog: Blog): string {
    return `${this.apiUrl}/${blog.featuredImage}`;
  }

  onClickDelete(blogId: any) {
    this.blogService.deleteBlog(blogId).subscribe((res) => {
      console.log(res);
      this.getBlogs(); // Ensure the blog list is refreshed after deletion
    });
  }

  onClickEdit(blogId: string) {
    this.dashboardComponent.loadComponent('CreateBlog', { blogId });
  }
}
