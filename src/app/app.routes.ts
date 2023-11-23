import { Route } from '@angular/router';
import { SimpleContactFormComponent } from './components/simple-form-no-validation/simple-form.component';
import { SimpleFormWithValidationComponent } from './components/zod/simple-form-zod-validation/simple-form-with-validation.component';
import { SimpleFormAsyncValidationComponent } from './components/zod/simple-form-zod-async-validation/simple-form-async-validation.component';

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
    path: 'async-validation',
    component: SimpleFormAsyncValidationComponent,
  },
  {
    path: '',
    component: SimpleContactFormComponent,
  },
];
