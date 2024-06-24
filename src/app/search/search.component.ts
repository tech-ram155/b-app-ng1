import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: Blog[] = [];

  @Output() searchCompleted: EventEmitter<Blog[]> = new EventEmitter<Blog[]>();

  constructor(private blogService: BlogService) {}

  onSearch(): void {
    this.blogService.searchBlogs(this.searchQuery).subscribe(
      (results) => {
        this.searchResults = results;
        this.searchCompleted.emit(this.searchResults);
        //console.log(this.searchResults);
        
      },
      (error) => {
        console.error('Error fetching search results', error);
      }
    );
  }
}
