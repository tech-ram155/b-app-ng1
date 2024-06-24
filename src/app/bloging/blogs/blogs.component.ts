import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  imports: [SearchComponent, BlogCategoryLinkComponent, CommonModule, PaginationComponent],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit, AfterViewInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  totalResults: number = 0;
  currentPage: number = 1;
  resultsPerPage: number = 3;

  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  constructor(
    private router: Router,
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.getBlogs();
  }

  ngAfterViewInit(): void {
    this.searchComponent.searchCompleted.subscribe((results: Blog[]) => {
      this.filteredBlogs = results;
      this.totalResults = results.length;
      this.currentPage = 1; // Reset to the first page on new search
    });

    this.blogService.selectedCategory$.subscribe((category) => {
      if (category && category.toLowerCase() !== 'all') {
        this.filteredBlogs = this.blogs.filter((blog) => blog.category === category && blog.status === 'Published').slice(0,this.resultsPerPage);
      } else {
        this.filteredBlogs = this.blogs.filter((blog) => blog.status === 'Published');
      }
      this.totalResults = this.filteredBlogs.length;
      this.currentPage = 1; // Reset to the first page on category change
    });
  }

  getBlogs() {
    this.blogService.getAllBlogs().subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
      this.filteredBlogs = this.blogs.filter((blog) => blog.status === 'Published');
      this.totalResults = this.filteredBlogs.length;
      this.getBlogsForPage();
    });
  }

  getBlogDetails(blogId: string) {
    this.router.navigate([`blog-details/${blogId}`]);
  }

  getImage(blog: Blog) {
    return this.blogService.getImageUrl(blog);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getBlogsForPage();
  }

  getBlogsForPage() {
    const startIndex = (this.currentPage - 1) * this.resultsPerPage;
    const endIndex = startIndex + this.resultsPerPage;
    this.filteredBlogs = this.blogs.slice(startIndex, endIndex);
  }
}
