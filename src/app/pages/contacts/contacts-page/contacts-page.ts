import {Component, OnInit} from '@angular/core';
import {ContactList} from '../contact-list/contact-list';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {filter} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-contacts-page',
  imports: [
    CommonModule,
    ContactList,
    RouterOutlet
  ],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss'
})
export class ContactsPage implements OnInit {
  isMobile = false;
  isDetailRoute = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.checkMobile();
    this.isDetailRoute = this.router.url.includes('/contacts/');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isDetailRoute = this.router.url.includes('/contacts/');
      });
    window.addEventListener('resize', this.checkMobile.bind(this));
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
}
