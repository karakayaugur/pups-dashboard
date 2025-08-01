import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedUi } from '@shared/shared-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...SharedUi],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected readonly title = signal('pups-app');
}
