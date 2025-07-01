import { NgClass } from "@angular/common"
import { Component, input } from "@angular/core"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-checklist",
  template: `
    <div
      class="flex items-center gap-x-1 text-sm transition-colors ease-in-out duration-500 rounded"
      [ngClass]="completed() ? 'text-primary' : 'text-gray-400'"
    >
      <mat-icon
        class="material-icons-outlined scale-70"
        fontIcon="check_circle"
      />
      <span>{{ text() }}</span>
    </div>
  `,
  imports: [MatIcon, NgClass],
})
export class ChecklistComponent {
  text = input.required<string>()
  completed = input(false)
}
