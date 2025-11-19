import { Component, OnInit, signal, computed } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss'
})
export class SignalComponent implements OnInit {

  // Basic Writable signals
  firstName = signal<string>('Shubham');
  lastName = signal<string>('Suryawanshi');

  // basic computed signals
  a = signal<number>(0);
  b = signal<number>(0);

  // loader
  loader = signal<boolean>(true);

  // computed signal that derives from `a` and `b`
  c = computed(() => this.a() + this.b());

  // make fullName computed as well
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  ngOnInit(): void {
    setTimeout(() => {
      this.loader.set(false);
      // update writable signals to demonstrate recomputation
      // this.firstName.set('Shubham Updated');
      // this.lastName.set('Suryawanshi Updated');

      // change a and b   to show computed `c` updates automatically
      this.a.set(15);
      this.b.set(25);

      console.log(this.fullName());
      console.log('Addition of a & b  = c (computed):', this.c());
    }, 2000);


  }


}

