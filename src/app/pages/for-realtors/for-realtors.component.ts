import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-for-realtors.component',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './for-realtors.component.html',
  styleUrl: './for-realtors.component.scss',
})
export class ForRealtorsComponent {
contactForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      brokerage: ['', [Validators.required]],
      experience: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      newsletter: [true]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.contactForm.value);
      
      // In a real application, you would send the data to your backend
      // Example:
      // this.http.post('/api/contact/realtors', this.contactForm.value).subscribe({
      //   next: () => this.handleSuccess(),
      //   error: () => this.handleError()
      // });
      
      this.handleSuccess();
    }, 1500);
  }

  private handleSuccess() {
    this.isSuccess = true;
    this.isSubmitting = false;
  }

  private handleError() {
    this.isSubmitting = false;
    // Handle error - show error message to user
    alert('There was an error sending your message. Please try again.');
  }

  resetForm() {
    this.isSuccess = false;
    this.contactForm.reset({
      newsletter: true
    });
  }
}