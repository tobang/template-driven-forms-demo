import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { FormModel } from 'src/app/models/form.model';
import { AddressComponent } from '../address/address.component';
import { FormDirective } from 'src/app/utils/form/form.directive';

@Component({
  selector: 'app-simple-form-with-validation',
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
  templateUrl: './simple-form-with-validation.component.html',
  styleUrls: ['./simple-form-with-validation.component.scss'],
})
export class SimpleFormWithValidationComponent implements AfterViewInit {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  protected formValue$: BehaviorSubject<FormModel> =
    new BehaviorSubject<FormModel>({});

  ngAfterViewInit(): void {}

  onSubmit() {
    console.log(this.formValue$.value);
  }

  showForm() {
    console.log(this.ngForm);
  }
}
