import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AddressComponent } from './address/address.component';
import { AddressModel } from '../models/address.model';
import { FormDirective } from '../utils/form/form.directive';
import { BehaviorSubject } from 'rxjs';

export type FormModel = Partial<{
  firstName: string;
  lastName: string;
  addresses: {
    homeAddress: AddressModel;
    workAddress: AddressModel;
    includeWorkAddress: boolean;
  };
}>;

@Component({
  selector: 'app-simple-contact-form',
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
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss'],
})
export class SimpleContactFormComponent implements AfterViewInit {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  protected formValue$: BehaviorSubject<FormModel> =
    new BehaviorSubject<FormModel>({});

  ngAfterViewInit(): void {}

  onSubmit() {
    console.log(this.ngForm?.value);
  }

  showForm() {
    console.log(this.ngForm);
  }
}
