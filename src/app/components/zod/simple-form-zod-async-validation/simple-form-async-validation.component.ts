import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { ContactModel } from '../../../models/contact.model';

import { FormZodDirective } from '../../../utils/form/zod/form-zod.directive';

import {
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../../utils/form/template-driven-forms';
import { AddressWithValidationComponent } from '../simple-form-zod-validation/address/address-with-validation.component';
import { ContactService } from '../../../services/contact.service';
import { createAsyncZodSchema } from '../../../validations/zod';

@Component({
  selector: 'app-simple-form-async-validation',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    AddressWithValidationComponent,
    FormZodDirective,
    templateDrivenForms,
  ],
  templateUrl: './simple-form-async-validation.component.html',
  styleUrls: ['./simple-form-async-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class SimpleFormAsyncValidationComponent {
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
