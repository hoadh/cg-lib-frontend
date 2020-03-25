import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../_core/services/notification.service';
import * as $ from '../../../assets/vendor_components/jquery-3.2.1/dist/jquery.min.js';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isShow = false;
  type: string;
  title: string;
  message: string;
  icon: string;

  constructor(private notification: NotificationService) { }

  ngOnInit() {
    this.initCloseButtons();
    this.notification.getSubject().subscribe( notification => {
      switch (notification.type) {
        case 'success': this.type = 'alert-success'; break;
        case 'warning': this.type = 'alert-info'; break;
        case 'error': this.type = 'alert-danger'; break;
        default: this.type = 'alert-info';
      }
      this.title = notification.title;
      this.message = notification.message;
      this.showElement();
    });
  }

  showElement() {
    $('.alertbottom').fadeIn(350);
  }

  initCloseButtons() {
    $('.myadmin-alert .closed').click(function(event) {
      $(this).parents('.myadmin-alert').fadeOut(350);
      return false;
    });
  }

}
