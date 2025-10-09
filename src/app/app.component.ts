import { Component, inject} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Angular 19';

  router = inject(Router);

  openCounter() {
    this.router.navigate(['/counter'])
  }
  
}
