import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.styl']
})
export class MainMenuComponent implements OnInit {
  myDate = new Date();
  constructor(
    angulartics2GoogleTagManager: Angulartics2GoogleTagManager
  ) {
    angulartics2GoogleTagManager.startTracking();
  }

  ngOnInit() {
  }

}
