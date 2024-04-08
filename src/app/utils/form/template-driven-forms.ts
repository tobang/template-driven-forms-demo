import { ControlContainer, FormsModule, NgForm } from '@angular/forms';

import { FormModelGroupDirective } from './form-model-group.directive';
import { FormModelDirective } from './form-model.directive';
import { formViewProvider } from './form-view.provider';
import { ValidationWrapperComponent } from './validation-wrapper/validation-wrapper.component';

export const templateDrivenForms = [
  FormsModule,
  ValidationWrapperComponent,
  FormModelDirective,
  FormModelGroupDirective,
];
export const templateDrivenFormsViewProviders = [
  { provide: ControlContainer, useExisting: NgForm },
  formViewProvider,
];
