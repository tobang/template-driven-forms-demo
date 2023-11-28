import { Route } from '@angular/router';
import { ContactFormComponent } from './components/form-no-validation/contact-form.component';
import { ContactFormZodValidationComponent } from './components/template-driven-forms/zod/contact-form-zod-validation/contact-form-zod-validation.component';
import { ContactFormAsyncZodValidationComponent } from './components/template-driven-forms/zod/contact-form-zod-async-validation/contact-form-async-zod-validation.component';
import { ContactFormVestValidationComponent } from './components/template-driven-forms/vest/contact-form-vest-validation/contact-form-vest-validation.component';
import { ContactFormAsyncVestValidationComponent } from './components/template-driven-forms/vest/contact-form-vest-async-validation/contact-form-async-vest-validation.component';
import { ContactFormReactiveValidationComponent } from './components/reactive-forms/contact-form-validation/contact-form-reactive-validation.component';

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
    path: 'async-vest-validation',
    component: ContactFormAsyncVestValidationComponent,
  },
  {
    path: 'reactive-form-validation',
    component: ContactFormReactiveValidationComponent,
  },
  {
    path: '',
    component: ContactFormComponent,
  },
];
