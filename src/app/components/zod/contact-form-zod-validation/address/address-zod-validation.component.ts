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
  templateUrl: './address-zod-validation.component.html',
  styleUrls: ['./address-zod-validation.component.scss'],
  viewProviders: [templateDrivenFormsViewProviders],
})
export class AddressZodValidationComponent {
  @Input() public address: AddressModel | undefined;
}
