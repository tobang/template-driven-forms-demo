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

import { ContactService } from '../../../services/contact.service';
import { AddressVestValidationComponent } from '../contact-form-vest-validation/address/address-vest-validation.component';
import { createContactAsyncValidationSuite } from '../../../validations/vest/contact-form-async-vest.validation';

@Component({
  selector: 'app-contact-form-async-vest-validation',
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
  templateUrl: './contact-form-async-vest-validation.component.html',
  styleUrls: ['./contact-form-async-vest-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class ContactFormAsyncVestValidationComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  private constactService = inject(ContactService);
  protected form$: BehaviorSubject<ContactModel> =
    new BehaviorSubject<ContactModel>({});
  protected contactSchema = createContactAsyncValidationSuite(
    this.constactService
  );

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
