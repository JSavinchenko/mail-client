import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() writeMessage = new EventEmitter<void>();
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  openMessageForm() {
    this.writeMessage.emit();
  }
}
