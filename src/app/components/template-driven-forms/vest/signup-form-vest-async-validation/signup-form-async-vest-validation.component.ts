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

import { SignupService } from '../../../../services/signup.service';
import { AddressVestValidationComponent } from '../signup-form-vest-validation/address/address-vest-validation.component';
import { createSignupAsyncValidationSuite } from '../../../../validations/vest/signup-form-async-vest.validation';

@Component({
  selector: 'app-signup-form-async-vest-validation',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    AddressVestValidationComponent,
    FormDirective,
    templateDrivenForms,
  ],
  templateUrl: './signup-form-async-vest-validation.component.html',
  styleUrls: ['./signup-form-async-vest-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class SignupFormAsyncVestValidationComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  private constactService = inject(SignupService);
  protected form$: BehaviorSubject<SignupModel> =
    new BehaviorSubject<SignupModel>({});
  protected signupSchema = createSignupAsyncValidationSuite(
    this.constactService
  );

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
