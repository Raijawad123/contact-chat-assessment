import { Component, signal } from '@angular/core';
import {ContactService} from './core/services/contact/contact.service';
import {HttpClient} from '@angular/common/http';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [ContactService, HttpClient],
})
export class App {
  protected readonly title = signal('contact-chat');
}
