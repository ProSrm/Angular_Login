import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.http.post('https://localhost:7067/api/layer/login', loginData)
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.router.navigate(['/list-show']);
          },
          error: (error) => {
            console.error('Login failed', error);
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }
}