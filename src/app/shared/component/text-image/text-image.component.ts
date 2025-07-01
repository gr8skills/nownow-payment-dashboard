import { NgClass, NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, computed, input } from "@angular/core";

@Component({
  selector: "app-text-image",
  template: `
    @if(image()){
    <img
      [ngSrc]="image() || ''"
      [alt]="alt() || 'image'"
      class="!w-7 !h-7 object-top object-cover rounded-full shadow"
      [ngClass]="class()"
      [width]="width()"
      [height]="height()"
    />
    } @else{
    <div
      class="grid place-content-center text-sm w-7 h-7 bg-yellow-300 rounded-full"
      [ngClass]="class()"
      [ngStyle]="{ backgroundColor: color() }"
    >
      {{ firstLetter() || "c" }}
    </div>
    }
  `,
  imports: [NgOptimizedImage, NgClass, NgStyle],
})
export class TextImageComponent {
  image = input<string>()
  name = input<string>()
  alt = input<string>()
  width = input<number>(32)
  height = input<number>(32)
  class = input<string>()
  color = input<string>()

  firstLetter = computed(() => this.name()?.[0] || "c")
}
