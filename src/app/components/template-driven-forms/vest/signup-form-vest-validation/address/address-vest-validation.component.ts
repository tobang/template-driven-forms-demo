import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../../../../utils/form';
import { AddressModel } from '../../../../../models/address.model';
import { zipCodes } from '../../../../../validations/vest/zip-codes';

@Component({
  selector: 'app-address-vest-validation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    templateDrivenForms,
  ],
  templateUrl: './address-vest-validation.component.html',
  styleUrls: ['./address-vest-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class AddressVestValidationComponent {
  @Input() public address: AddressModel | undefined;
  public readonly zipCodes = zipCodes;
}
