import { Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  @Input() alertTitle: string = '';

  @ContentChild('contentChildData') contentChildData!: ElementRef;

  getContentChildValue() {
    debugger;
    const text = this.contentChildData.nativeElement.innerText;
    console.log('Content child data:', text);
    this.alertTitle = text;
  }

}
