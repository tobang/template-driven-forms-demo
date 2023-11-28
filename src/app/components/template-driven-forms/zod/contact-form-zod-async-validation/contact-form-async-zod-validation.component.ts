import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { ContactModel } from '../../../../models/contact.model';

import { FormDirective } from '../../../../utils/form/form.directive';

import {
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../../../utils/form/template-driven-forms';
import { AddressZodValidationComponent } from '../contact-form-zod-validation/address/address-zod-validation.component';
import { ContactService } from '../../../../services/contact.service';
import { createAsyncZodSchema } from '../../../../validations/zod';

@Component({
  selector: 'app-contact-form-async-zod-validation',
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
  templateUrl: './contact-form-async-zod-validation.component.html',
  styleUrls: ['./contact-form-async-zod-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class ContactFormAsyncZodValidationComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  public form$: BehaviorSubject<ContactModel> =
    new BehaviorSubject<ContactModel>({});
  private constactService = inject(ContactService);

  protected contactSchema = createAsyncZodSchema(this.constactService);

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
