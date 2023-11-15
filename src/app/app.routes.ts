import { Route } from '@angular/router';
import { SimpleContactFormComponent } from './components/simple-form-no-validation/simple-form.component';
import { SimpleFormWithValidationComponent } from './components/simple-form-with-validation/simple-form-with-validation.component';

export const routes: Route[] = [
  {
    path: 'no-validation',
    component: SimpleContactFormComponent,
  },
  {
    path: 'with-validation',
    component: SimpleFormWithValidationComponent,
  },
  {
    path: '',
    component: SimpleContactFormComponent,
  },
];
