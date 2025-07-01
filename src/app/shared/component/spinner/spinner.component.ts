import { NgStyle } from "@angular/common";
import { Component, input } from "@angular/core";

@Component({
    selector: "app-spinner",
    template: `<span class="loader" [ngStyle]="{
        '--diameter': diameter() + 'px',
        '--strokeWidth': strokeWidth() + 'px',
        '--color': color(),
        '--speed': speed()+ 'ms',
    }"></span>`,
    styles: `
        .loader {
            width: var(--diameter);
            height: var(--diameter);
            border-color: var(--color);
            border-width: var(--strokeWidth);
            border-style: solid;
            border-bottom-color: transparent;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation var(--speed) linear infinite;
        }

        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        } 
    `,
    imports: [NgStyle],
})
export class SpinnerComponent {
    diameter = input('48');
    strokeWidth = input('4');
    color = input('#fff');
    speed = input('700');
}