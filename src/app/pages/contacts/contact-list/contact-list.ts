import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../../core/services/contact/contact.service';
import {catchError, finalize, of} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Contact} from '../../../models/contact';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss'
})
export class ContactList implements OnInit {
  contacts!: Contact[];
  isLoading: boolean = false;
  selectedContactId: string = '';

  constructor(private _contactService: ContactService, private router: Router) {
  }

  ngOnInit() {
    this.getContacts();
  }

  select(item: Contact): void {
    this.selectedContactId = item.id;
    if (item?.id) {
      this.router.navigate(['/contacts', item.id]);
    }
  }


  getContacts() {
    this.isLoading = true;
    this._contactService.getContacts().pipe(
      catchError((err) => {
        if (err.status === 400 && err.error?.message === 'Invalid page.') {
          console.warn('Invalid page.');
        } else {
          console.error('Other error:', err);
        }
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((res: Contact[]) => {
      this.contacts = res;
    });
  }
}
