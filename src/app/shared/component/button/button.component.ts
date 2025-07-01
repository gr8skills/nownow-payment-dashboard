import { NgClass, NgStyle } from "@angular/common";
import { Component, input } from "@angular/core";
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: "app-button",
  template: `
    <button
      [type]="type()"
      class="bg-slate-600 hover:bg-slate-700 text-white font-medium capitalize py-3 px-4 w-full rounded-lg focus:outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition ease-in-out duration-500"
      [ngClass]="class"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading() ? 'true' : 'false'"
      [attr.aria-disabled]="disabled() || loading() ? 'true' : 'false'"
      [attr.aria-label]="text()"
    >
      @if(loading()){
      <span class="flex items-center justify-center" aria-hidden="true">
        <app-spinner diameter="24" strokeWidth="2" />
      </span>
      } @else { @if(icon()) {
      <i
        [ngClass]="icon"
        [ngStyle]="{
          'margin-right': iconPosition() === 'left' ? '5px' : '0',
          'margin-left': iconPosition() === 'right' ? '5px' : '0'
        }"
      ></i>
      }
      {{ text() }}
      }
    </button>
  `,
  styles: ``,
  imports: [NgClass, NgStyle, SpinnerComponent],
})
export class ButtonComponent {
  readonly type = input<"button" | "submit">("submit");
  readonly text = input.required<string>();
  readonly class = input<string>();
  readonly loading = input<boolean>();
  readonly disabled = input<boolean>(false);
  readonly icon = input<string>();
  readonly iconPosition = input<"left" | "right">("left");
}
