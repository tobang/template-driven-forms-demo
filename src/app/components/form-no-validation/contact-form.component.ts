import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AddressComponent } from './address/address.component';

import { FormDirective } from '../../utils/form/no-validation/form-no-validation.directive';
import { BehaviorSubject } from 'rxjs';
import { ContactModel } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
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
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @ViewChild(NgForm) ngForm: NgForm | undefined;
  protected formValue$: BehaviorSubject<ContactModel> =
    new BehaviorSubject<ContactModel>({});

  onSubmit() {
    console.log(this.formValue$.value);
  }

  showForm() {
    console.log(this.ngForm);
  }
}