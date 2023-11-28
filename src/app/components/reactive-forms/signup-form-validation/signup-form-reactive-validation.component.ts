import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup-form-reactive-validation',
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
  templateUrl: './signup-form-reactive-validation.component.html',
  styleUrls: ['./signup-form-reactive-validation.component.scss'],
})
export class SignupFormReactiveValidationComponent
  implements OnInit, OnDestroy
{
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroy$ = new Subject();

  public readonly form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    addresses: this.formBuilder.group({
      includeWorkAddress: [],
      homeAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      }),
      workAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      }),
    }),
  });

  ngOnInit(): void {
    // Start by disabling the workAddress as it is hidden by default
    this.form.controls.addresses.controls.workAddress.disable();
    // Listen to changes to the includeWorkAddress checkbox control
    // and update form accordingly
    this.form.controls.addresses.controls.includeWorkAddress.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((include) => {
        if (include) {
          this.form.controls.addresses.controls.workAddress.enable();
        } else {
          this.form.controls.addresses.controls.workAddress.disable();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

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
