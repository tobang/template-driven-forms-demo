import { Route } from '@angular/router';
import { SignupFormComponent } from './components/form-no-validation/signup-form.component';
import { SignupFormVestValidationComponent } from './components/template-driven-forms/vest/signup-form-vest-validation/signup-form-vest-validation.component';
import { SignupFormAsyncVestValidationComponent } from './components/template-driven-forms/vest/signup-form-vest-async-validation/signup-form-async-vest-validation.component';
import { SignupFormReactiveValidationComponent } from './components/reactive-forms/signup-form-validation/signup-form-reactive-validation.component';

export const routes: Route[] = [
  {
    path: 'no-validation',
    component: SignupFormComponent,
  },
  {
    path: 'vest-validation',
    component: SignupFormVestValidationComponent,
  },
  {
    path: 'async-vest-validation',
    component: SignupFormAsyncVestValidationComponent,
  },
  {
    path: 'reactive-form-validation',
    component: SignupFormReactiveValidationComponent,
  },
  {
    path: '',
    component: SignupFormComponent,
  },
];
