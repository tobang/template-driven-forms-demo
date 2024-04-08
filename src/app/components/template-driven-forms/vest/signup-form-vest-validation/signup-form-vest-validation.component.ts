import { Component, ViewChild, inject } from '@angular/core';
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
  public form$: BehaviorSubject<SignupModel> = new BehaviorSubject<SignupModel>(
    {}
  );

  protected signupSchema = createSignupValidationSuite();

  setFormValue(value: SignupModel) {
    this.form$.next(value);
  }

  onSubmit() {
    if (this.ngForm?.valid) {
      console.log(this.form$.value);
    }
  }

  showForm() {
    console.log(this.ngForm);
  }
}
