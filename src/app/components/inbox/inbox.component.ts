import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {NavbarComponent} from '../navbar/navbar.component';
import {MessageService} from '../../services/message/message.service';
import {MessageType} from '../../services/message/message.type';
import {AuthService} from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-inbox',
  imports: [
    HeaderComponent,
    NavbarComponent,
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    CommonModule,
    DialogModule,
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent implements OnInit {
  messages: MessageType[] = [];
  selectedMessage: MessageType | null = null;
  replyMessage = '';
  replyModalVisible = false;

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
      this.messages = this.messageService.getInboxMessages(currentUser.login);
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

  openReplyModal() {
    this.replyModalVisible = true;
  }

  sendReply() {
    if (this.selectedMessage && this.replyMessage.trim()) {
      const sender = this.authService.getCurrentUser();
      if (sender) {
        this.messageService.sendMessage(
          sender.login,
          this.selectedMessage.sender,
          this.replyMessage,
        );
        this.replyMessage = '';
        this.replyModalVisible = false;
      }
    }
  }
}
