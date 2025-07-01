import { NgOptimizedImage } from '@angular/common';

import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AppPaths } from '@app/app.routes';
import { AccountPaths } from '../layout.routes';

@Component({
  selector: 'app-desktop-nav',
  template: `
    <nav class="flex items-center justify-between gap-x-4">
      <div class="min-w-3xs max-w-xs">
        <input
          type="search"
          id="search"
          appInputStyle
          placeholder="Search by MSISDN / Wallet"
        />
      </div>

      <div class="flex items-center justify-end gap-x-4">
        <section>
          <mat-icon
            class="material-icons-outlined !text-gray-600"
            fontIcon="notifications"
            matBadge="7"
            [matBadgeHidden]="false"
          />
        </section>
        <hr class="rotate-90 w-6 border border-gray-200" />

<section class="relative flex items-center gap-x-3">
          <div class="relative cursor-pointer" (click)="toggleMenu()">
            <img
              ngSrc="/media/profile.jpg"
              alt="user image"
              width="60"
              height="60"
              class="w-10 h-10 object-cover rounded-lg"
            />
            <span class="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
          </div>
          @if (showMenu()) {
            <div
            class="absolute right-0 top-14 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100"
          >
            <a
              routerLink="/dashboard"
              class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"
            >
              <mat-icon>dashboard</mat-icon> Dashboard
            </a>
            <a
              routerLink="/profile"
              class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm"
            >
              <mat-icon>person</mat-icon> My Profile
            </a>
            <a
              (click)="logout()"
              class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
            >
              <mat-icon>logout</mat-icon> Logout
            </a>
            </div>
          }
        </section>
      </div>
    </nav>
  `,
  styles: `
        :host{
            width: 100%;
        }
    `,
  imports: [NgOptimizedImage, MatBadgeModule, MatIcon, MatIconModule],
})
export class DesktopNavComponent {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  readonly pageTitle = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.route.snapshot.firstChild?.data?.['title'])
  );

  readonly initialTitle = signal<string>(
    this.route.snapshot.firstChild?.data?.['title']
  );

  readonly AppPath = AppPaths;
  readonly AccountPath = AccountPaths;

  showMenu = signal(false);

  toggleMenu() {
    this.showMenu.set(!this.showMenu) ;
  }

  logout() {
    // Add real logout logic here
    this.router.navigate(['/login']);
  }
}
