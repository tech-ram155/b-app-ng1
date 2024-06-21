import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoryLinkComponent } from './blog-category-link.component';

describe('BlogCategoryLinkComponent', () => {
  let component: BlogCategoryLinkComponent;
  let fixture: ComponentFixture<BlogCategoryLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCategoryLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogCategoryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
