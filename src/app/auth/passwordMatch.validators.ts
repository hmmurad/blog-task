import { AbstractControl } from '@angular/forms';

export function passwordValidator(form: AbstractControl) {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { misMatch: true }
    : null;
}
