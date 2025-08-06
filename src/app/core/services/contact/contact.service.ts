import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../../../models/contact';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {EmailAddress} from '../../../models/EmailAddress';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.base_url}contacts`);
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${environment.base_url}contacts/${id}`);
  }

  getEmailsByContactId(id: number): Observable<EmailAddress[]> {
    return this.http.get<EmailAddress[]>(`${environment.base_url}contacts/${id}/email_addresses`);
  }
}
