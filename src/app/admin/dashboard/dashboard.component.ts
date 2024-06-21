import { Component, AfterViewInit, Type, ViewChild, ViewContainerRef, EnvironmentInjector, createEnvironmentInjector } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AuthService } from '../../services/auth.service';
import { COMPONENT_PARAMS } from './token'; // Import the token
import { DraftsComponent } from './drafts/drafts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  AfterViewInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;

  private componentMapping: { [key: string]: Type<any> } = {
    'CreateBlog': CreateBlogComponent,
    'AddCategory': CreateCategoryComponent,
    'Blogs': BlogListComponent,
    'Drafts': DraftsComponent
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private environmentInjector: EnvironmentInjector
  ) {}

 
  ngAfterViewInit(): void {
    if (this.dynamicComponentContainer) {
      // Use setTimeout to ensure the view is fully initialized
      setTimeout(() => {
        this.loadComponent('Blogs');
      }, 0);
    } else {
      console.error('dynamicComponentContainer is not initialized');
    }
  }
  

  loadComponent(componentName: string, params?: any) {
    const component = this.componentMapping[componentName];
    if (component) {
      this.dynamicComponentContainer.clear();
      const injector = createEnvironmentInjector(
        [{ provide: COMPONENT_PARAMS, useValue: params }],
        this.environmentInjector
      );
      const componentRef = this.dynamicComponentContainer.createComponent(component, {
        environmentInjector: injector
      });
    } else {
      console.error(`Component not found: ${componentName}`);
    }
  }

  onClickLogout() {
    this.authService.setLoggedIn(false);
    this.authService.logout();
    this.router.navigate(['/admin']);
  }
}
