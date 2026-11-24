
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Login request
export interface LoginRequest {
  username: string;
  password: string;
}

// Login response
export interface LoginResponse {
  message: string;
  challengeId: string;
  maskedMobileNumber: string;
  expiresInSeconds: number;
}

// OTP request
export interface VerifyOtpRequest {
  challengeId: string;
  otp: string;
}

// OTP response
export interface VerifyOtpResponse {
  message: string;
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl =
    'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  // Login API
  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login`,
      request
    );
  }

  // OTP Verification API
  verifyOtp(
    request: VerifyOtpRequest
  ): Observable<VerifyOtpResponse> {

    return this.http.post<VerifyOtpResponse>(
      `${this.baseUrl}/verify-otp`,
      request
    );
  }
}
