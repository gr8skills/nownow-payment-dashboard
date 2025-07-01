import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from './data-access/input.types';
import { InputStyle } from './directive/input';

@Component({
  selector: 'app-icon-input',
  template: ` <div>
    <label [for]="label()" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label() }}
    </label>
    <div class="relative">
      <input
        #inputField
        [type]="type()"
        [id]="label()"
        appInputStyle
        [value]="text()"
        [placeholder]="placeholder()"
        [minLength]="minLength()"
        [maxLength]="maxLength()"
        [autocomplete]="autocomplete()"
        [disabled]="disabled"
        (keyup)="onType()"
        (click)="markAsTouched()"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-4">
        <ng-content select="svg"></ng-content>
      </div>
    </div>
  </div>`,
  imports: [InputStyle],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: IconInputComponent,
    },
  ],
})
export class IconInputComponent implements ControlValueAccessor {
  label = input.required<string>();
  type = input<InputType>('text');
  placeholder = input<string>();
  minLength = input<number>();
  maxLength = input<number>();
  autocomplete = input<string>();
  disable = input<boolean>(false);
  class = input<string>();

  text = signal<number | string>('');

  inputField = viewChild<ElementRef<HTMLInputElement>>('inputField');

  touched = false;

  disabled = false;

  onChange = (text: unknown) => {};

  onTouched = () => {};

  onType() {
    const text = this.inputField()?.nativeElement.value;
    if (!this.disabled) {
      this.text.set(text as string);
      this.onChange(this.text() as string);
    }
  }

  writeValue(value: number | string) {
    this.text;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
