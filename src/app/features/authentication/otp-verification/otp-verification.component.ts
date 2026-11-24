import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService,
  VerifyOtpResponse
 } from
  '../../../core/services/auth.service';

import { TokenService } from
  '../../../core/services/token.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent implements OnInit {

  otpForm: FormGroup;

  challengeId = '';
  mobileNumber = '';

  loading = false;
  errorMessage = '';
  successMessage = '';

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private tokenService: TokenService,
  private route: ActivatedRoute,
  private router: Router
) {

    this.otpForm = this.fb.group({
      otp: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{4}$/)
        ]
      ]
    });
  }

  ngOnInit(): void {

    // Read challenge ID passed from login flow.
    this.route.queryParamMap.subscribe(params => {

      this.challengeId =
        params.get('challengeId') || '';

      this.mobileNumber =
        params.get('mobile') || '';
    });
  }

  onOtpInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    input.value = input.value
      .replace(/\D/g, '')
      .slice(0, 4);

    this.otpForm.patchValue({
      otp: input.value
    });

    this.errorMessage = '';
  }

  verifyOtp(): void {

    if (!this.challengeId) {
      this.errorMessage =
        'OTP challenge is missing. Please login again.';
      return;
    }

    if (this.otpForm.invalid || this.loading) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = {
      challengeId: this.challengeId,
      otp: this.otpForm.value.otp
    };

this.authService.verifyOtp(request).subscribe({

  next: (response) => {

    this.tokenService.setToken(response.accessToken);

    this.loading = false;
    this.successMessage = 'OTP verification successful!';

    console.log('Authentication response:', response);

     this.router.navigate(['/accounts']);
  },

      error: (error) => {

    this.loading = false;

    this.errorMessage =
      error.error?.message ||
      'OTP verification failed. Please try again.';

    this.otpForm.reset();

    console.error('OTP verification error:', error);
  }
});
  }
}