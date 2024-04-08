import {
  Component,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { SignupModel } from '../../../../models/signup.model';

import { FormDirective } from '../../../../utils/form/form.directive';

import {
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../../../utils/form/template-driven-forms';
import { AddressVestValidationComponent } from './address/address-vest-validation.component';
import { createSignupValidationSuite } from '../../../../validations/vest';
import { PhoneNumbersVestValidationComponent } from './phone-numbers/phone-numbers-vest-validation.component';
import { notNullOrUndefined } from 'src/app/utils/general/not-null-undefined';

@Component({
  selector: 'app-signup-form-vest-validation',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    AddressVestValidationComponent,
    PhoneNumbersVestValidationComponent,
    FormDirective,
    templateDrivenForms,
  ],
  templateUrl: './signup-form-vest-validation.component.html',
  styleUrls: ['./signup-form-vest-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class SignupFormVestValidationComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;

  protected signupSchema = createSignupValidationSuite();
  protected readonly formValue = signal<SignupModel>({});
  protected readonly viewModel = computed(() => {
    return { form: this.formValue() };
  });

  protected setFormValue(v: {
    formValue: SignupModel;
    key: string | undefined;
  }): void {
    if (notNullOrUndefined(v.formValue)) {
      this.formValue.set(v.formValue);
    }
  }

  onSubmit() {
    if (this.ngForm?.valid) {
      console.log(this.formValue());
    }
  }

  protected get vm() {
    return this.viewModel();
  }

  showForm() {
    console.log(this.ngForm);
  }
}
