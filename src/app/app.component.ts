import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleContactFormComponent } from './components/simple-form-no-validation/simple-form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SimpleContactFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Template Driven Forms Demo';
}
