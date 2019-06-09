import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.styl']
})
export class PolicyComponent implements OnInit {

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Политика конфиденциальности | CleanUp service');
  }

}
