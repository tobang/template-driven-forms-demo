import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './components/form-no-validation/signup-form.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/ui/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SignupFormComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Template Driven Forms Demo';
}
