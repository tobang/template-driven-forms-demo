import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {
  templateDrivenForms,
  templateDrivenFormsViewProviders,
} from '../../../../utils/form';
import { AddressModel } from '../../../../models/address.model';

@Component({
  selector: 'app-address-with-validation',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, templateDrivenForms],
  templateUrl: './address-with-validation.component.html',
  styleUrls: ['./address-with-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class AddressWithValidationComponent {
  @Input() public address: AddressModel | undefined;
}
