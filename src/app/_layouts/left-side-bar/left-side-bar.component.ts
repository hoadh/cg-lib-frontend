import { NavigationService } from '../../_core/services/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {
  navigation;

  constructor(private nav: NavigationService) { }

  ngOnInit() {
    this.navigation = this.nav.getNativation();
  }

}
