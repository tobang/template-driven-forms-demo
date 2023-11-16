import { FormControlStatus } from '@angular/forms';

export interface FormModel<T> {
  value?: T;
  dirty?: boolean;
  status?: FormControlStatus;
  pristine?: boolean | null;
}
