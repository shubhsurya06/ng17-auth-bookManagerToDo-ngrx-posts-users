import { Component, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, AlertComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  @ViewChild('myInputValue') myInputValue!: ElementRef;

  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  // get input value on button click using VIEW_CHILD
  getValue() {
    // debugger;
    console.log('My Input value:' ), this.myInputValue.nativeElement.value;

    this.alertComponent.callChildMethod();
  }

}
