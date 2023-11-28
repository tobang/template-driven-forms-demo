import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AddressReactiveComponent } from './address/address-reactive.component';

@Component({
  selector: 'app-contact-form-reactive-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    AddressReactiveComponent,
  ],
  templateUrl: './contact-form-reactive-validation.component.html',
  styleUrls: ['./contact-form-reactive-validation.component.scss'],
})
export class ContactFormReactiveValidationComponent {
  private readonly formBuilder = inject(FormBuilder);

  public readonly form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    addresses: this.formBuilder.group({
      includeWorkAddress: [],
      homeAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),
      shippingAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  reset() {
    this.form.reset();
  }

  showForm() {
    console.log(this.form);
  }
}
