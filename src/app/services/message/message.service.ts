import {Injectable} from '@angular/core';
import {MessageType} from './message.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly MESSAGES_KEY = 'messages';

  constructor() {
    this.initializeMessages();
  }

  private initializeMessages() {
    if (!localStorage.getItem(this.MESSAGES_KEY)) {
      const messages: MessageType[] = [
        {
          id: 1,
          sender: 'ivan',
          recipient: 'maria',
          text: 'Привет, Мария!',
          date: new Date().toISOString(),
        },
        {
          id: 2,
          sender: 'maria',
          recipient: 'ivan',
          text: 'Привет, Иван!',
          date: new Date().toISOString(),
        },
        {
          id: 3,
          sender: 'vlad',
          recipient: 'alla',
          text: 'Как дела, Алла?',
          date: new Date().toISOString(),
        },
        {
          id: 4,
          sender: 'vlad',
          recipient: 'ivan',
          text: 'Картельные сговоры не допускают ситуации, при которой сделанные на базе интернет-аналитики выводы, инициированные исключительно синтетически, указаны как претенденты на роль ключевых факторов. Банальные, но неопровержимые выводы, а также базовые сценарии поведения пользователей и по сей день остаются уделом либералов, которые жаждут быть объективно рассмотрены соответствующими инстанциями. Значимость этих проблем настолько очевидна, что курс на социально-ориентированный национальный проект говорит о возможностях благоприятных перспектив.',
          date: new Date().toISOString(),
        },
        {
          id: 5,
          sender: 'alla',
          recipient: 'ivan',
          text: 'Современные технологии достигли такого уровня, что укрепление и развитие внутренней структуры позволяет выполнить важные задания по разработке кластеризации усилий. В рамках спецификации современных стандартов, тщательные исследования конкурентов преданы социально-демократической анафеме.',
          date: new Date().toISOString(),
        },
      ];
      localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
    }
  }

  //Получение входящих сообщений
  getInboxMessages(userLogin: string): MessageType[] {
    const messages = JSON.parse(
      localStorage.getItem(this.MESSAGES_KEY) || '[]',
    );
    const inboxMessages = messages.filter(
      (msg: MessageType) => msg.recipient === userLogin,
    );
    return inboxMessages;
  }

  //Получение исходящих сообщений
  getOutboxMessages(userLogin: string): MessageType[] {
    const messages = JSON.parse(
      localStorage.getItem(this.MESSAGES_KEY) || '[]',
    );
    const outboxMessages = messages.filter(
      (msg: MessageType) => msg.sender === userLogin,
    );
    return outboxMessages;
  }

  //Отправка сообщения
  sendMessage(sender: string, recipient: string, text: string): void {
    const messages = JSON.parse(
      localStorage.getItem(this.MESSAGES_KEY) || '[]',
    );
    const newMessage: MessageType = {
      id: Date.now(),
      sender,
      recipient,
      text,
      date: new Date().toISOString(),
    };
    messages.push(newMessage);
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
  }

  //Удаление сообщения
  deleteMessage(id: number) {
    let messages = JSON.parse(
      localStorage.getItem(this.MESSAGES_KEY) || '[]',
    ) as MessageType[];
    messages = messages.filter((msg) => msg.id !== id);
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
  }
}
