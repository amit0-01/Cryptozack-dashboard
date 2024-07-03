import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { min } from 'rxjs';
import { PublishService } from '../../publish-strategy/Providers/publish.service';
import { SupportService } from '../Providers/support.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  replyMessage: string = '';
  parseData: any;
  chatData: any[] = [];
  showLoader = false

  clientData: any
  sortedMessages: any;
  private supportInterval: any;

  constructor(
    private supportService: SupportService,
    private dialogRef: MatDialogRef<ReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let userData = localStorage.getItem('userinfo')
    if (userData) {
      this.parseData = JSON.parse(userData);
    }
  }

  ngOnInit(): void {
    this.getSupport();

    this.supportInterval = setInterval(() => {
      this.getSupport();
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.supportInterval);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  getSupport() {
    const data = {
      token: this.parseData.token,
      supportId: this.data.id
    };

    this.supportService.getsupportUserData(data).subscribe((res) => {
      this.clientData = res.data;

      if (this.clientData.issue && Array.isArray(this.clientData.issue)) {
        for (let i = 0; i < this.clientData.issue.length; i++) {
          this.clientData.issue[i].type = "issue";
        }
      }

      if (this.clientData.replies && Array.isArray(this.clientData.replies)) {
        for (let i = 0; i < this.clientData.replies.length; i++) {
          this.clientData.replies[i].type = "replies";
        }
      }

      this.sortedMessages = this.sortMessages([...(this.clientData.issue || []), ...(this.clientData.replies || [])]);
    });
  }


  sortMessages(messages: any[]): any[] {
    return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }


  getTimeDifference(timestamp: string): string {
    const messageTime = new Date(timestamp).getTime();
    const currentTime = Date.now();
    const timeDiffMinutes = Math.floor((currentTime - messageTime) / (1000 * 60)); // Difference in minutes
    if (timeDiffMinutes < 1) {
      return 'Just now';
    } else if (timeDiffMinutes < 60) {
      return timeDiffMinutes + ' min ago';
    } else if (timeDiffMinutes < 24 * 60) {
      const hours = Math.floor(timeDiffMinutes / 60);
      const minutes = timeDiffMinutes % 60;
      return hours + ' hours ' + minutes + ' min ago';
    } else if (timeDiffMinutes < 12 * 24 * 60) {
      const days = Math.floor(timeDiffMinutes / (24 * 60));
      const remainingHours = Math.floor((timeDiffMinutes % (24 * 60)) / 60);
      return days + ' days ' + remainingHours + ' hours ago';
    } else {
      const days = Math.floor(timeDiffMinutes / (24 * 60));
      return days + ' days ago';
    }
  }

  replyToUser() {
    if (this.replyMessage.length > 0) {
      const data = {
        supportId: this.data.id,
        replies: this.replyMessage
      };
      this.supportService.replyToUser(data).subscribe((res) => {
        if (res) {
          this.getSupport();
          this.replyMessage = ''
        }
      })
    }

  }


}
