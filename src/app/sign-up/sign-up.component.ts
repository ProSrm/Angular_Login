import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      // delete formData.confirmPassword;
      // debugger;
      this.http.post('https://localhost:7067/api/layer/signup', formData)
        .subscribe(
          (response: any) => {
            console.log('Signup successful:', response);
            alert('Signup successful!');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again.');
          }
        );
    }
  }
}