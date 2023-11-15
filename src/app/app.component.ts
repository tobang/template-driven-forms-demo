import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleContactFormComponent } from './components/simple-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SimpleContactFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TemplateDrivenFormsDemo';
}
