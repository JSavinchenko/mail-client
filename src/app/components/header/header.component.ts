import {Component} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userLogin: string | null = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.userLogin = this.authService.getCurrentUser()?.login ?? null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
