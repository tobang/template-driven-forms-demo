import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { ContactModel } from '../../models/contact.model';

import { FormDirective } from '../../utils/form/form.directive';
import {
  createAsyncZodSchema,
  simpleZodSchema,
} from '../validations/simple-form-zod.validation';
import {
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../utils/form/template-driven-forms';
import { AddressWithValidationComponent } from '../simple-form-with-validation/address/address-with-validation.component';
import { ContactService } from 'src/app/services/contact.service';

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
    FormDirective,
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
