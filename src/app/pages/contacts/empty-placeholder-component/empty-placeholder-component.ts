import {Component, Input, isDevMode} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-empty-placeholder-component',
  imports: [],
  templateUrl: './empty-placeholder-component.html',
  styleUrl: './empty-placeholder-component.scss'
})
export class EmptyPlaceholderComponent {
  isMobile = window.innerWidth <= 768;
}
