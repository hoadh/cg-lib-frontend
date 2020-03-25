import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {
  @Input() message: Array<string> | string;
  @Input() isError = false;

  result: any;

  constructor(private sanitized: DomSanitizer) { }

  ngOnInit() {
    this.result = this.getUpdatedMessage(this.message);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.result = this.getUpdatedMessage(changes.message.currentValue);
  }

  getUpdatedMessage(message) {
    if (message instanceof Array) {
      message = message.join('<br>');
    }
    return this.sanitized.bypassSecurityTrustHtml(message);
  }

}
