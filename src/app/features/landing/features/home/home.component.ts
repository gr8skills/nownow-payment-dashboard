import { NgOptimizedImage } from "@angular/common"
import { Component } from "@angular/core"
import { CtaComponent } from "@landing/ui/cta.component"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  imports: [NgOptimizedImage, CtaComponent],
})
export class HomeComponent {}
