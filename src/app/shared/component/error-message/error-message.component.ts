import { NgClass } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
    selector: "app-error-message",
    template: `
        <div class="text-red-500 text-sm" [ngClass]="class">{{message()}}</div>
    `,
    imports: [NgClass]
})
export class ErrorMessageComponent{
    message = input.required<string>()
    class = input()
}