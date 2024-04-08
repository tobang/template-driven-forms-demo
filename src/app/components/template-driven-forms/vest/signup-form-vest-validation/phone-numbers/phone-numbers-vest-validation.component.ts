import { Component, Input } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { PhonenumberModel } from '../../../../../models/phone-number.model';
import {
  addItem,
  removeItem,
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../../../../utils/form';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-phone-numbers-vest-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    KeyValuePipe,
    templateDrivenForms,
  ],
  templateUrl: './phone-numbers-vest-validation.component.html',
  styleUrls: ['./phone-numbers-vest-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class PhoneNumbersVestValidationComponent {
  @Input() public phoneNumbers: Record<string, string> = {};
  public addValue = '';

  protected tracker = (i: number) => i;

  protected addPhoneNumber(value: any) {
    this.phoneNumbers = addItem(this.phoneNumbers, value);
    this.addValue = '';
  }

  protected removePhoneNumber(key: string) {
    this.phoneNumbers = removeItem(this.phoneNumbers, key);
  }
}
