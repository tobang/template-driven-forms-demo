import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AddressComponent } from './address/address.component';

import { FormDirective } from '../../utils/form/no-validation/form-no-validation.directive';
import { BehaviorSubject } from 'rxjs';
import { SignupModel } from '../../models/signup.model';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    AddressComponent,
    FormDirective,
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  protected formValue$: BehaviorSubject<SignupModel> =
    new BehaviorSubject<SignupModel>({});

  onSubmit() {
    console.log(this.formValue$.value);
  }

  showForm() {
    console.log(this.ngForm);
  }
}
