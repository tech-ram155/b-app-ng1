import { Routes } from '@angular/router';
import { BlogsComponent } from './bloging/blogs/blogs.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { BlogDetailsComponent } from './bloging/blog-details/blog-details.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { authGuard } from './services/auth.guard';
import { ContactComponent } from './user/contact/contact.component';
import { AboutComponent } from './user/about/about.component';

export const routes: Routes = [
    {
        path:'',
        component:UserLayoutComponent,
        children:[
            {path:'',component:BlogsComponent},
            {path:'blog-details/:id',component:BlogDetailsComponent},
            {path:'contact',component:ContactComponent},
            {path:'about',component:AboutComponent},
        ]
    },

    {
        path:'admin',
        component:AdminLayoutComponent,
        children:[
            {path:'login',component:LoginComponent},
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate: [authGuard],
                data: { roles: ['admin'] }
            },
        ]
    },
    //{ path: '', redirectTo: '', pathMatch: 'full' }, 
    //{ path: '**', redirectTo: 'user/home' } 
];
    