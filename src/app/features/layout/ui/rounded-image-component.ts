import { NgClass, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-round-image",
  template: `
    <img
      [ngSrc]="image()"
      [alt]="alt()"
      class="!h-8 !w-8 aspect-square object-top object-cover rounded-full"
      [ngClass]="class()"
      [width]="width()"
      [height]="height()"
      loading="lazy"
    />
  `,
  imports: [NgOptimizedImage, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundImageComponent {
  width = input<number>(32)
  height = input<number>(32)
  image = input.required<string>()
  alt = input.required<string>()
  class = input<string>()
}
