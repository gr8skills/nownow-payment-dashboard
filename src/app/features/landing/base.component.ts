import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LandingFooterComponent } from "@landing/ui/footer.component";
import { LandingHeaderComponent } from "@landing/ui/header.component";

@Component({
  selector: "app-landing-base",
  template: `
    <app-landing-header />
        <router-outlet />
    <app-landing-footer />
  `,
  imports: [RouterOutlet, LandingFooterComponent, LandingHeaderComponent],
})
export class BaseComponent {}