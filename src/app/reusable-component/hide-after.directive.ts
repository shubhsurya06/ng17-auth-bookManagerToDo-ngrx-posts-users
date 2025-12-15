import { Directive, ViewContainerRef, TemplateRef, OnInit, Input } from '@angular/core';

// class HideAfterContext {
//   // public $implicit = 1000;
//   public get $implicit() {
//     return this.hideAfter;
//   }
//   public hideAfter = 0;
//   public counter = 0;
// }

@Directive({
  selector: '[hideAfter]',
  standalone: true
})
export class HideAfterDirective implements OnInit {

  @Input("hideAfter")
  delay = 0;

  @Input("hideAfterThen")
  placeholder: TemplateRef<any> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template);
    setTimeout(() => {
      this.viewContainerRef.clear();
      if (this.placeholder) {
        this.viewContainerRef.createEmbeddedView(this.placeholder);
      }
    }, this.delay);
  }

  // @Input()
  // hideAfter = 0;

  // @Input('hideAfter')
  // set delay(value: number | null) {
  //   this._delay = value ?? 0;
  //   // this.context.counter = this._delay / 1000;
  //   this.context.hideAfter = this.context.counter = this._delay / 1000;
  // }
  // private _delay: number = 0;

  // private context = new HideAfterContext();

  // @Input('hideAfterThen')
  // placeholder: TemplateRef<any> | null = null;

  // constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  // ngOnInit(): void {
  //   this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);

  //   const intervalId = setInterval(() => {
  //     this.context.counter--;
  //   }, 1000);

  //   setTimeout(() => {
  //     this.viewContainerRef.clear();
  //     if (this.placeholder) {
  //       this.viewContainerRef.createEmbeddedView(this.placeholder, this.context);
  //     }
  //     clearInterval(intervalId);
  //   }, this._delay);
  // }

}
