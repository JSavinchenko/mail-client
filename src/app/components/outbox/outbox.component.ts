import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {MessageType} from '../../services/message/message.type';
import {MessageService} from '../../services/message/message.service';
import {AuthService} from '../../services/auth/auth.service';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-outbox',
  imports: [
    HeaderComponent,
    NavbarComponent,
    CommonModule,
    ButtonModule,
    TableModule,
  ],
  templateUrl: './outbox.component.html',
  styleUrl: './outbox.component.scss',
})
export class OutboxComponent implements OnInit {
  messages: MessageType[] = [];
  selectedMessage: MessageType | null = null;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  private loadMessages(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser)
      this.messages = this.messageService.getOutboxMessages(currentUser.login);
  }

  selectMessage(message: MessageType): void {
    this.selectedMessage = message;
  }

  closeMessage(): void {
    this.selectedMessage = null;
  }

  deleteMessage(id: number): void {
    this.messageService.deleteMessage(id);
    this.loadMessages();
  }
}
