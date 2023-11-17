import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel, NgModelGroup } from '@angular/forms';

@Component({
  selector: '[validation-wrapper]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-wrapper.component.html',
  styleUrls: ['./validation-wrapper.component.scss'],
})
export class ValidationWrapperComponent {
  @Input() showAllErrors = false;
  @ContentChild(NgModel) public ngModel?: NgModel;
  public readonly ngModelGroup: NgModelGroup | null = inject(NgModelGroup, {
    optional: true,
    self: true,
  });

  @HostBinding('class.input-wrapper--invalid')
  public get invalid() {
    if (
      (!this.ngModelGroup &&
        this.ngModel?.control?.errors &&
        (this.ngModel?.touched || this.ngModel?.dirty)) ||
      (this.ngModelGroup?.control?.errors &&
        (this.ngModelGroup.touched || this.ngModelGroup?.dirty))
    ) {
      return true;
    }
    return false;
  }
}
