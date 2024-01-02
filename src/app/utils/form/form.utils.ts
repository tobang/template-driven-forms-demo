import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Returns the name of the control
 * @param control
 */
export const getControlName = (
  control: AbstractControl | null
): string | undefined => {
  return control
    ? Object.entries(control.parent?.controls ?? []).find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value === control
      )?.[0] ?? undefined
    : undefined;
};

/**
 * Returns an array of all possible control paths
 * ['firstName', 'addresses.homeAddress.street'] etc..
 * @param rootForm
 */
export const getAbstractControlPaths = (rootForm: FormGroup, c = '') => {
  return Object.keys(rootForm.controls)
    .map((key) => ({ control: rootForm.controls[key], key }))
    .reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: string[], curr): any =>
        curr.control instanceof FormGroup
          ? [
              ...(acc as string[]),
              ...getAbstractControlPaths(curr.control, c + curr.key + '.'),
            ]
          : [...acc, c + curr.key],
      []
    );
};

/**
 * Returns the field name/path of a form control
 * Eg: addresses.workAddress.street
 * @param  rootForm
 * @param  controlName
 * @param  parentName
 */
export const getAbstractControlPath = (
  rootForm: FormGroup,
  controlName: string,
  parentName?: string
): string => {
  return (
    getAbstractControlPaths(rootForm).find((path) =>
      path.includes(parentName ? `${parentName}.${controlName}` : controlName)
    ) ?? ''
  );
};

/**
 * Return the name/path of a form group: Eg: addresses.workAddress
 * @param rootGroup
 * @param group
 */
export const getGroupPath = (
  rootGroup: FormGroup,
  group: AbstractControl
): string =>
  // Recursively loop the controls of the form to find the path of the group
  Object.keys(rootGroup.controls).reduce((acc, key) => {
    const ctrl = rootGroup.get(key);
    // If we have a value the group path has been found
    if (acc.length > 0) return acc;
    // If the current group has the property the key
    if (rootGroup.controls.hasOwnProperty(key)) {
      // If the ctrl equals the group we can just return the key
      // as we have found the right group
      if (ctrl === group) {
        return key;
      } else {
        // If the ctrl is a FormGroup we will need to call
        // ourself recursively
        if (ctrl instanceof FormGroup) {
          const path = getGroupPath(ctrl, group);
          if (path) {
            return key + '.' + path;
          }
        }
      }
    }
    return '';
  }, '');

/**
 * Calculates the field name/path of a form control: Eg: addresses.workAddress.street
 * @param rootForm
 * @param control
 */
export const getFormControlFieldName = (
  rootForm: FormGroup,
  control: AbstractControl
): string => {
  const parentFormGroup = control.parent?.controls;
  if (!parentFormGroup) {
    throw new Error(
      'An ngModel should always be wrapped in a parent FormGroup'
    );
  }

  const controlName = getControlName(control) as string;
  const parentName = getControlName(control.parent);

  const abstractControlPath = getAbstractControlPath(
    rootForm,
    controlName,
    parentName
  );
  return abstractControlPath;
};

/**
 * Calcuates the field name/path of a form group Eg: addresses.workAddress
 * @param rootForm
 * @param control
 */
export const getFormGroupFieldName = (
  rootForm: FormGroup,
  control: AbstractControl
): string => {
  const parentFormGroup = control.parent?.controls;
  if (!parentFormGroup) {
    throw new Error(
      'An ngModelGroup should always be wrapped in a parent FormGroup'
    );
  }
  return getGroupPath(rootForm, control);
};
