import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputStyle]'
})
export class InputStyle {
  private readonly renderer = inject(Renderer2)
  private el = inject(ElementRef<HTMLInputElement>);

  constructor() { 
    this.renderer.setAttribute(this.el.nativeElement, "class", "w-full bg-white px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all")
  }

}
