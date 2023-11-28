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
import { AddressZodValidationComponent } from '../signup-form-zod-validation/address/address-zod-validation.component';
import { SignupService } from '../../../../services/signup.service';
import { createAsyncZodSchema } from '../../../../validations/zod';

@Component({
  selector: 'app-signup-form-async-zod-validation',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    AddressZodValidationComponent,
    FormDirective,
    templateDrivenForms,
  ],
  templateUrl: './signup-form-async-zod-validation.component.html',
  styleUrls: ['./signup-form-async-zod-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class SignupFormAsyncZodValidationComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  public form$: BehaviorSubject<SignupModel> = new BehaviorSubject<SignupModel>(
    {}
  );
  private constactService = inject(SignupService);

  protected signupSchema = createAsyncZodSchema(this.constactService);

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
