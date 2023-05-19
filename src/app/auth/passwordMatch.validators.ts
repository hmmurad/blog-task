import { AbstractControl } from '@angular/forms';

export function passwordValidator(ctrl: AbstractControl) {
  const password = ctrl.get('password');
  const confirmPassword = ctrl.get('confirmPassword');

  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { misMatch: true }
    : null;
}
