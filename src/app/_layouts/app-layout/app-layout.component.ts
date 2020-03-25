import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {

    /**
     * Fix bug: [Bug] Sau khi login, phải refresh trình duyệt mới có thể click vào menu bên trái
     */
    const reloadCount = localStorage.getItem('SHOULD_RELOAD');
    if (reloadCount === undefined || reloadCount === null) {
      localStorage.setItem('SHOULD_RELOAD', '1');
      window.location.reload();
    }
  }

}
