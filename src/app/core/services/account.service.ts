
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly apiUrl =
    'http://localhost:8080/api/v1/accounts';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  getAccounts(): Observable<any> {

    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(
      this.apiUrl,
      { headers }
    );
  }
}
