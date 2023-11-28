import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { ContactModel } from '../../../../models/contact.model';

import { FormDirective } from '../../../../utils/form/form.directive';
import { simpleZodSchema } from '../../../../validations/zod/contact-form-zod.validation';
import {
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../../../utils/form/template-driven-forms';
import { AddressZodValidationComponent } from './address/address-zod-validation.component';

@Component({
  selector: 'app-contact-form-zod-validation',
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
  templateUrl: './contact-form-zod-validation.component.html',
  styleUrls: ['./contact-form-zod-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class ContactFormZodValidationComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  public form$: BehaviorSubject<ContactModel> =
    new BehaviorSubject<ContactModel>({});

  protected contactSchema = simpleZodSchema;

  setFormValue(value: ContactModel) {
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
