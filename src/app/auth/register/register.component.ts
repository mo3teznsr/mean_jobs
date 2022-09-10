import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) {}
error:String=''
  passwordsMatchValidator(
    control: UntypedFormControl
  ): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  userForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    mobile:new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required]),
    repeatPassword: new UntypedFormControl('', [
      Validators.required,
      this.passwordsMatchValidator,
    ]),
  });

  get name(): AbstractControl {
    return this.userForm.get('name')!;
  }

  get mobile(): AbstractControl {
    return this.userForm.get('mobile')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  register(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { name,mobile, email, password, repeatPassword } =
      this.userForm.getRawValue();

    this.authService
      .register(name,mobile, email, password, repeatPassword)
      .subscribe(() => {
        this.router.navigate(['']);
      },(e)=>{
        this.error=e.statusText
      });
  }
}
