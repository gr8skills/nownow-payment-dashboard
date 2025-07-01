import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/data-access/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'payment-app';
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.getBearerToken();
  }

  getBearerToken() {
    this.authService.getToken().pipe(take(1)).subscribe();
  }
}
