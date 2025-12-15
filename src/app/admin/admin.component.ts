import { Component, ViewChild, ElementRef, ContentChild, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AlertComponent } from '../alert/alert.component';
import { ButtonComponent } from '../reusable-component/button/button.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, AlertComponent, ButtonComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminComponent {

  @ViewChild('myInputValue') myInputValue!: ElementRef;

  // @ContentChild('AlertComponent') alertComponent!: AlertComponent;

  // get input value on button click using VIEW_CHILD
  getValue() {
    debugger;
    console.log('My Input value:' ), this.myInputValue.nativeElement.value;
  }

  setContentChild() {
    debugger;
    
  }

}
