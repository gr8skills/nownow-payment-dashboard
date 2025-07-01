import { MediaMatcher } from "@angular/cdk/layout";
import { Component, OnDestroy, OnInit, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterOutlet } from "@angular/router";
import { NgOptimizedImage } from '@angular/common';
import { AppPaths } from "@app/app.routes";
import { AccountPaths } from "./layout.routes";
import { DesktopNavComponent } from "./ui/desktop-nav.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { LoadingProgressService } from "@app/shared/utils/loading/loading-progress.service";
import { AuthService } from "../auth/data-access/services/auth.service";
import { SubscriptionHandler } from "@app/shared/utils/subscription-handler";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackbarConfig } from '@shared/utils/material-ui.utils';
import { SidebarComponent } from './ui/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    NgOptimizedImage,
    DesktopNavComponent,
    MatProgressBarModule,
    SidebarComponent,
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly _snackBar = inject(MatSnackBar);
  public loaderService = inject(LoadingProgressService);
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  subs = new SubscriptionHandler();

  readonly AppPath = AppPaths;
  readonly AccountPath = AccountPaths;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  logOut() {

  }
}
