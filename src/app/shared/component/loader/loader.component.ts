import { Component } from "@angular/core";

@Component({
    selector: "app-loader",
    template: `
        <div class="w-full min-w-[14rem] min-h-[10rem] rounded-md bg-gray-300 p-4 animate-pulse space-x-4">
            <div class="w-full h-full"></div>
        </div>
    `
})
export class LoaderComponent { }