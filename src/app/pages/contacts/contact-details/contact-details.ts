import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from '../../../models/contact';
import {EmailAddress} from '../../../models/EmailAddress';
import {ContactService} from '../../../core/services/contact/contact.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Subscription} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-contact-details',
  imports: [CommonModule],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss'
})
export class ContactDetails implements OnInit, OnDestroy {
  contact!: Contact;
  emails: EmailAddress[] = [];
  isLoading = true;
  id!: number;
  routeSub!: Subscription;

  constructor(private _contactService: ContactService, private _activeRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this._activeRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.loadContactDetails(this.id);
    });
  }

  loadContactDetails(id: number) {
    this.isLoading = true;
    forkJoin({
      contact: this._contactService.getContactById(id),
      emails: this._contactService.getEmailsByContactId(id)
    }).subscribe({
      next: ({contact, emails}) => {
        this.contact = contact;
        this.emails = emails;
        this.isLoading = false
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
