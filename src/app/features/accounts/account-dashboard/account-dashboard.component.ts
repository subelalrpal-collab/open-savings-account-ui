
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.scss'
})
export class AccountDashboardComponent implements OnInit {

  loading = false;
  errorMessage = '';
  accounts: any = null;

  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {

    this.loading = true;
    this.errorMessage = '';

    this.accountService.getAccounts().subscribe({

      next: (response: any) => {
        this.accounts = response;
        this.loading = false;

        console.log('Accounts API response:', response);
      },

      error: (error: HttpErrorResponse) => {
        this.loading = false;

        this.errorMessage =
          error.error?.message ||
          'Unable to load accounts. Please try again.';

        console.error('Accounts API error:', error);
      }
    });
  }
}
