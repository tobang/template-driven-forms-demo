import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { ContactModel } from '../../../models/contact.model';

import { FormDirective } from '../../../utils/form/form.directive';

import {
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../../utils/form/template-driven-forms';
import { AddressVestValidationComponent } from './address/address-vest-validation.component';
import { createContactValidationSuite } from '../../../validations/vest';

@Component({
  selector: 'app-contact-form-vest-validation',
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
  templateUrl: './contact-form-vest-validation.component.html',
  styleUrls: ['./contact-form-vest-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class ContactFormVestValidationComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  public form$: BehaviorSubject<ContactModel> =
    new BehaviorSubject<ContactModel>({});

  protected contactSchema = createContactValidationSuite();

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
