import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-category-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-category-link.component.html',
  styleUrl: './blog-category-link.component.css'
})
export class BlogCategoryLinkComponent   {
  categories = ['All','Yoga', 'Ayurveda', 'Fitness'];
  selectedStyle= 'All';

  constructor(private blogService: BlogService) {}


  selectCategory(category: string) {
    this.selectedStyle = category || 'All';
    this.blogService.setSelectedCategory(category);
  }
  
} 
