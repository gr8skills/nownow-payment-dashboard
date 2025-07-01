import { NgClass, NgOptimizedImage } from "@angular/common";
import { Component, input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-menu-item",
  template: `
    <a
      class="flex items-center gap-x-2 py-3 px-4 !text-gray-500 !font-normal capitalize focus:outline-none"
      [routerLink]="link()"
      routerLinkActive="bg-gray-200 !text-gray-900 !font-medium"
      [ngClass]="class"
    >
      <img
        [ngSrc]="iconLink() || ''"
        alt="menu icon"
        class="!w-5 !h-5 object-contain"
        height="20"
        width="20"
      />
      <span>{{ label() }}</span>
    </a>
  `,
  imports: [NgClass, RouterLink, RouterLinkActive, NgOptimizedImage],
})
export class MenuItemComponent {
  label = input.required()
  link = input.required<string>()
  iconLink = input<string>()
  class = input<string>()
}