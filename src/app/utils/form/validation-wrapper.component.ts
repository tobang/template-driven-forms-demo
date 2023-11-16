/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  HostBinding,
  inject,
  Input,
} from '@angular/core';
import { NgModel, NgModelGroup } from '@angular/forms';

import { FormDirective } from './no-validation/form-no-validation.directive';

@Component({
  selector: '[validationWrapper]',
  imports: [CommonModule],
  template: `
    <div class="validation-wrapper-content">
      <ng-content></ng-content>
    </div>
    <div class="validation-wrapper-errors spacer">
      <ul *ngIf="!ngModelGroup && ngModel?.control?.errors">
        <ng-container *ngIf="showAll; else single">
          <li
            class="p-error"
            *ngFor="let error of ngModel.control.errors?.['errors']"
          >
            {{ error }}
          </li>
        </ng-container>
        <ng-template #single>
          <li class="p-error">
            {{ ngModel.control.errors?.['errors'][0]}}
          </li>
        </ng-template>
      </ul>

      <ng-container
        *ngIf="ngModelGroup && (form.ngForm.submitted || ngModelGroup.touched)"
      >
        <ul *ngIf="ngModelGroup.control?.errors">
          <ng-container *ngIf="showAll; else single">
            <li
              class="p-error"
              *ngFor="let error of ngModel.control.errors?.['errors']"
            >
              {{ error }}
            </li>
          </ng-container>
          <ng-template #single>
            <li class="p-error">
              {{ ngModel.control.errors?.['errors'][0] }}
            </li>
          </ng-template>
        </ul>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .spacer {
        height: 24px;
      }
      .validation-wrapper-errors {
        li {
          list-style-type: none;
        }
        ul {
          padding: 0px;
          margin: 0px;
        }
      }
    `,
  ],
  standalone: true,
})
export class ValidationWrapperComponent {
  @Input() showAll = false;
  @ContentChild(NgModel) public ngModel!: NgModel;
  public readonly form = inject(FormDirective);
  public readonly ngModelGroup: NgModelGroup | null = inject(NgModelGroup, {
    optional: true,
    self: true,
  });

  @HostBinding('class.validation-wrapper-invalid') public get invalid() {
    if (
      !this.ngModelGroup &&
      this.ngModel?.control?.errors &&
      (this.form.ngForm.submitted || this.ngModel.touched)
    ) {
      return true;
    }
    if (
      this.ngModelGroup?.control?.errors &&
      (this.form.ngForm.submitted || this.ngModelGroup.touched)
    ) {
      return true;
    }
    return false;
  }
}
