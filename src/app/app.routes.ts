import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CreateComponent} from './components/create/create.component';
import {InboxComponent} from './components/inbox/inbox.component';
import {OutboxComponent} from './components/outbox/outbox.component';
import {authGuard} from './services/auth/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inbox', component: InboxComponent, canActivate: [authGuard]},
  {path: 'outbox', component: OutboxComponent, canActivate: [authGuard]},
  {path: 'create', component: CreateComponent, canActivate: [authGuard]},
];
