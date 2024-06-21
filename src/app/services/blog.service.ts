import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  blogUrl = 'http://localhost:3000/api/v1/blogs';
  apiUrl = 'http://localhost:3000';
  private httpWithoutInterceptor: HttpClient;

  constructor(private http: HttpClient, private httpBackend: HttpBackend) {
    // Create an HttpClient instance that will not trigger the interceptors
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.blogUrl}/${id}`);
  }
  
  private selectedCategorySubject = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }

  onBlogSubmit(data: FormData) {
    return this.http.post<Blog>(this.blogUrl, data);
  }

  getAllBlogs(): Observable<Blog[]> {
    // Use the HttpClient instance without interceptors
    return this.httpWithoutInterceptor.get<Blog[]>(this.blogUrl);
  }

  deleteBlog(blogId: string) {
    return this.http.delete<void>(`${this.blogUrl}/${blogId}`);
  }

  updateBlog(blogId: string, data: FormData) {
    return this.http.patch<Blog>(`${this.blogUrl}/${blogId}`, data);
  }

  getImageUrl(blog: Blog): string {
    return `${this.apiUrl}/${blog.featuredImage}`;
  }
}
