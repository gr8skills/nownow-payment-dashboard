import { NgOptimizedImage } from "@angular/common"
import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"
import { AppPaths } from "@app/app.routes"
import { LandingPaths } from "@landing/base.routes"

@Component({
  selector: "app-landing-footer",
  template: `
    <footer class="flex justify-center px-4 py-8 text-center">
      <div class="container-width flex flex-col justify-center items-center">
        <img class="!w-20 !h-14 object-contain"
        ngSrc="/icons/pollinlink-dark-logo.svg" alt="pollinlink dark logo"
        width="80" height="60" [routerLink]="[AppPaths.home]" priority=>
        <div class="flex justify-center gap-4 !mt-4">
          <a
            [routerLink]="[LandingPaths.home]"
            class="text-gray-500 !font-normal text-sm hover:text-gray-700"
            >Terms of Service</a
          >
          <a
            [routerLink]="[LandingPaths.privacyPolicy]"
            class="text-gray-500 !font-normal text-sm hover:text-gray-700"
            >Privacy Policy</a
          >
          <a
            [routerLink]="[LandingPaths.contact]"
            class="text-gray-500 !font-normal text-sm hover:text-gray-700"
            >Contact</a
          >
        </div>

        <p class="text-gray-500 text-sm !mt-6">
          Copyright 2025 PollinLink. All Rights Reserved
        </p>
        <p class="text-gray-500 text-sm !mt-4">Contact Support</p>
        <p class="text-gray-500 text-xl !font-semi-bold !mt-6">
          support&#64;pollilink.com
        </p>
      </div>
    </footer>
  `,
  imports: [NgOptimizedImage, RouterLink],
})
export class LandingFooterComponent {
  readonly AppPaths = AppPaths
  readonly LandingPaths = LandingPaths
}
