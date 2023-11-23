import { Route } from '@angular/router';
import { ContactFormComponent } from './components/form-no-validation/contact-form.component';
import { ContactFormZodValidationComponent } from './components/zod/contact-form-zod-validation/contact-form-zod-validation.component';
import { ContactFormAsyncZodValidationComponent } from './components/zod/contact-form-zod-async-validation/contact-form-async-zod-validation.component';
import { ContactFormVestValidationComponent } from './components/vest/contact-form-vest-validation/contact-form-vest-validation.component';

export const routes: Route[] = [
  {
    path: 'no-validation',
    component: ContactFormComponent,
  },
  {
    path: 'zod-validation',
    component: ContactFormZodValidationComponent,
  },
  {
    path: 'async-zod-validation',
    component: ContactFormAsyncZodValidationComponent,
  },
  {
    path: 'vest-validation',
    component: ContactFormVestValidationComponent,
  },
  {
    path: '',
    component: ContactFormComponent,
  },
];
