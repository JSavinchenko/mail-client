import {Component, EventEmitter, Output} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {ButtonModule} from 'primeng/button';
import {MessageService} from '../../services/message/message.service';
import {AuthService} from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [
    HeaderComponent,
    ButtonModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  @Output() close = new EventEmitter<void>();

  users: {login: string; name: string}[] = [];
  newMessage = {receiver: '', text: ''};

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.users = this.authService.getAllUsers();
  }

  sendMessage(): void {
    const sender = this.authService.getCurrentUser();
    if (sender && this.newMessage.receiver && this.newMessage.text.trim()) {
      this.messageService.sendMessage(
        sender.login,
        this.newMessage.receiver,
        this.newMessage.text,
      );
      this.closeForm();
    } else {
      alert('Заполните все поля!');
    }
  }

  closeForm(): void {
    this.router.navigate(['/outbox']);
  }
}
