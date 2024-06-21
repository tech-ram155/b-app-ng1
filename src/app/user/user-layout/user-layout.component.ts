import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-user-layout',
    standalone: true,
    templateUrl: './user-layout.component.html',
    styleUrl: './user-layout.component.css',
    imports: [HeaderComponent, FooterComponent,RouterOutlet,RouterLink]
})
export class UserLayoutComponent {

}
