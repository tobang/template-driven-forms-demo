import { Route } from '@angular/router';
import { SimpleContactFormComponent } from './components/simple-form-no-validation/simple-form.component';

export const routes: Route[] = [
  {
    path: '',
    component: SimpleContactFormComponent,
  },
];
