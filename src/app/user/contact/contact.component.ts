import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder,private emailServece:EmailService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Send email logic here
      const formData = this.contactForm.value;
      this.emailServece.onEmailSubmit(formData).subscribe(
        res=>{
          console.log(res);
          
        },
        err=>{console.log(err);
        }
      )
      console.log(formData); // Replace this with actual logic to send email
    } else {
      // Mark form controls as touched to show validation errors
      this.contactForm.markAllAsTouched();
    }
  }
}

