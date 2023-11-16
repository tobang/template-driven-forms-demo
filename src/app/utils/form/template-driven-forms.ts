import { ControlContainer, FormsModule, NgForm } from '@angular/forms';

import { FormModelGroupDirective } from './form-model-group.directive';
import { FormModelDirective } from './form-model.directive';
import { formViewProvider } from './form-view.provider';
import { FormDirective } from './no-validation/form-no-validation.directive';
import { ValidationWrapperComponent } from './validation-wrapper/validation-wrapper.component';

export const templateDrivenForms = [
  FormDirective,
  FormsModule,
  ValidationWrapperComponent,
  FormModelDirective,
  FormModelGroupDirective,
];
export const templateDrivenFormsViewProviders = [
  { provide: ControlContainer, useExisting: NgForm },
  formViewProvider,
];
