import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './components/form-no-validation/contact-form.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/ui/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ContactFormComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Template Driven Forms Demo';
}
