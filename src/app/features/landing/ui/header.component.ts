import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AppPaths } from "@app/app.routes";
import { AuthPaths } from "@auth/auth.route";

@Component({
  selector: "app-landing-header",
  template: `
    <header class="flex justify-center bg-primary-faint p-4 px-2 md:px-4">
      <div
        class="mx-auto px-4 py-4 flex items-center justify-between container-width"
      >
        <img class="!w-16 !h-10 md:!w-20 md:!h-14 object-contain"
        ngSrc="/icons/pollinlink-dark-logo.svg" alt="pollinlink logo" width="80"
        height="60" [routerLink]="[AppPaths.home]" priority=>
        <div class="flex gap-3">
          <a
            [routerLink]="[AppPaths.auth, AuthPaths.login]"
            class="px-4 py-2 !text-black text-sm font-medium border border-gray-300 rounded-md"
            >Sign in</a
          >
          <a
            [routerLink]="[AppPaths.auth, AuthPaths.register]"
            class="px-4 py-2 bg-black !text-white text-sm font-medium rounded-md"
            >Create an account</a
          >
        </div>
      </div>
    </header>
  `,
  imports: [RouterLink, NgOptimizedImage],
})
export class LandingHeaderComponent {
  readonly AppPaths = AppPaths
  readonly AuthPaths = AuthPaths
}