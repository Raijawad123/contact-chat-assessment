import { Routes } from '@angular/router';
import {ContactDetails} from './pages/contacts/contact-details/contact-details';
import {ContactsPage} from './pages/contacts/contacts-page/contacts-page';
import {EmptyPlaceholderComponent} from './pages/contacts/empty-placeholder-component/empty-placeholder-component';

export const routes: Routes = [
  {
    path: 'contacts',
    component: ContactsPage,
    children: [
      {
        path: ':id',
        component: ContactDetails
      },
      {
        path: '',
        component: EmptyPlaceholderComponent
      }
    ]
  },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: '**', redirectTo: 'contacts' }
];
