import { Directive, HostBinding, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBackground]',
  standalone: true
})
export class BackgroundDirective implements OnInit, OnChanges {

  @Input('appBackground') defaultColor!: string;

  @Input() isCompleted: boolean = false;

  @Input() highlightColor: string = '#e19292ff'; // A light gray for highlighting

  @HostBinding('style.backgroundColor') backgroundColor!: string;

  ngOnInit() {
    console.log('this defaultColor:' , this.defaultColor)
    this.backgroundColor = this.isCompleted ? this.defaultColor : this.highlightColor;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isCompleted']) {
      this.backgroundColor = changes['isCompleted'].currentValue ? this.defaultColor : this.highlightColor;
    }
  }
}
