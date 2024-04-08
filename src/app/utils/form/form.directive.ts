/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input, OnDestroy, Output, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  pairwise,
  takeUntil,
} from 'rxjs';
import { StaticSuite } from 'vest';

// This directive's selector targets form elments that have a model and a suite property
@Directive({
  selector: 'form[model][suite]',
  standalone: true,
})
export class FormDirective<T> implements OnDestroy {
  // Each time the value of the injected form changes emit the value
  // debounce to reduce the amount of emissions
  // Inject the NgForm directive and only in this directive injector
  public readonly ngForm = inject(NgForm, { self: true });

  private destroy$ = new Subject();

  // Emits every time the dirty property of the form changes
  @Output() public readonly dirtyChange = this.ngForm.form.valueChanges.pipe(
    map(() => this.ngForm.dirty),
    distinctUntilChanged()
  );

  /**
   * This Output will emit the raw value of the form and the
   *  key name that caused the valueChanges to emit
   */
  @Output() formValueChange: Observable<T> = this.ngForm.form.valueChanges.pipe(
    debounceTime(0),
    map(() => this.ngForm.form.getRawValue())
  );

  @Input() public model!: T;
  // This is your vest validation schema.
  @Input() public suite!: StaticSuite<
    string,
    string,
    (model: T, field: string) => void
  >;

  // Emits every time the form status changes
  @Output() public readonly validChange = this.ngForm.form.statusChanges.pipe(
    debounceTime(0),
    map(() => this.ngForm.form.valid)
  );

  @Input() public set validationConfig(config: Record<string, string[]>) {
    Object.keys(config).forEach((key) => {
      this.formValueChange
        .pipe(
          map(() => this.ngForm.form.get(key)?.value),
          distinctUntilChanged(),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          config[key].forEach((path) => {
            this.ngForm.form
              .get(path)
              ?.updateValueAndValidity({ onlySelf: false, emitEvent: false });
          });
        });
    });
  }

  constructor() {
    // Get notified when the ngSubmit event fires, so we can
    // mark all controls as touched to show any errors.
    this.ngForm.ngSubmit.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.ngForm.form.markAllAsTouched();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
