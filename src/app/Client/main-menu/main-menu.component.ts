import { Component, OnInit } from '@angular/core';
import { Metrika } from 'ng-yandex-metrika';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.styl']
})
export class MainMenuComponent implements OnInit {
  myDate = new Date();
  constructor(
    private metrika: Metrika,
    private router: Router,
    private location: Location
  ) {
    let prevPath = this.location.path();
    this.router
      .events.pipe( filter(event => (event instanceof NavigationEnd)) )
      .subscribe(() => {
        const newPath = this.location.path();
        this.metrika.hit(newPath, {
          referer: prevPath,
        });
        prevPath = newPath;
      });
  }

  ngOnInit() {
  }

}
