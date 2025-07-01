import { NgOptimizedImage } from "@angular/common"
import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"
import { AppPaths } from "@app/app.routes"
import { AuthPaths } from "@auth/auth.route"

@Component({
  selector: "app-cta",
  template: `
    <section class="flex justify-center bg-black text-white py-12 mt-10 w-full">
      <div class="container-width mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold">Get Started Today</h2>
        <p class="mt-4">
          Ready to take your fields, teams, and tasks to the next level?
        </p>
        <div class="flex flex-wrap justify-center gap-3 !mt-14">
          <a
            [routerLink]="[AppPaths.auth, AuthPaths.login]"
            class="px-4 py-2 !text-white text-sm font-medium border border-gray-300 rounded-md"
            >Sign in</a
          >
          <a
            [routerLink]="[AppPaths.auth, AuthPaths.register]"
            class="px-4 py-2 bg-white !text-black text-sm font-medium rounded-md"
            >Create an account</a
          >
        </div>
      </div>
    </section>
  `,
  imports: [RouterLink],
})
export class CtaComponent {
  readonly AppPaths = AppPaths
  readonly AuthPaths = AuthPaths
}
