import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog';
import { COMPONENT_PARAMS } from '../token';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import  Editor from '../../../../../ckeditor5-custom-build/build/ckeditor';

@Component({
  selector: 'create-blog',
  standalone: true,
  imports: [ReactiveFormsModule, CKEditorModule],
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;
  selectedFile: File | null = null;
  blogId: string | null = null;
  public Editor:any = Editor;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    @Inject(COMPONENT_PARAMS) private componentParams: any
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
      summary: [''],
      tags: [''],
      category: ['Yoga', Validators.required],
      publicationDate: ['', Validators.required],
      status: ['Draft', Validators.required],
      slug: ['', Validators.required],
      featuredImage: [''],
      metaTitle: [''],
      metaDescription: [''],
      commentsEnabled: [true],
      viewCount: [0],
      likes: [0],
      dislikes: [0],
      seoKeywords: ['']
    });

    if (this.componentParams && this.componentParams.blogId) {
      this.blogId = this.componentParams.blogId;
    }
  }

  ngOnInit(): void {
    if (this.blogId) {
      this.blogService.getBlogById(this.blogId).subscribe((blog: Blog) => {
        this.blogForm.patchValue({
          ...blog,
          publicationDate: this.formatDate(blog.publicationDate),
          featuredImage: '' // Ensure the featuredImage input is cleared
        });
      });
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formData = new FormData();
      Object.keys(this.blogForm.controls).forEach(key => {
        formData.append(key, this.blogForm.get(key)?.value);
      });

      if (this.selectedFile) {
        formData.append('featuredImage', this.selectedFile, this.selectedFile.name);
      } else {
        // delete the empty data or string
        formData.delete('featuredImage');
      }

      if (this.blogId) {
        // Update blog
        this.blogService.updateBlog(this.blogId, formData).subscribe(res => {
          console.log(res);
        });
      } else {
        // Create new blog
        this.blogService.onBlogSubmit(formData).subscribe(res => {
          console.log(res);
        });
      }
      this.blogForm.reset();
    }
  }
}
