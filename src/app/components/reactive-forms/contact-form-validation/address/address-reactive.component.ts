import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-address-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './address-reactive.component.html',
  styleUrls: ['./address-reactive.component.scss'],
})
export class AddressReactiveComponent {
  @Input() address!: FormGroup<{
    street: FormControl<string | null>;
    city: FormControl<string | null>;
    zipcode: FormControl<string | null>;
  }> | null;
}
