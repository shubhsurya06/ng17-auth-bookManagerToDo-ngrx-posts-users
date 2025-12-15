import { Component, ViewEncapsulation } from '@angular/core';
import { HideAfterDirective } from '../hide-after.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [HideAfterDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ButtonComponent {

}
