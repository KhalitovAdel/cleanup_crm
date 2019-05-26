import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-otzovi',
  templateUrl: './otzovi.component.html',
  styleUrls: ['./otzovi.component.styl']
})
export class OtzoviComponent implements OnInit {
  @Input() has_partners: boolean;
  @Input() human_reviews: Array<any>;

  mySlideOptions = {items: 1, dots: true, nav: false, autoHeight:true};
  partnersSliderOption = {
    loop:true,
    margin:10,
    nav:false,
    dots: false,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    center:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
  }; 
  partners = [
    {img: './assets/img/b2b/partners/taif1.png'},
    {img: './assets/img/b2b/partners/bilyar.svg'},
    {img: './assets/img/b2b/partners/marani.png'},
    {img: './assets/img/b2b/partners/neofit.png'},
    {img: './assets/img/b2b/partners/big_funny.png'},
    {img: './assets/img/b2b/partners/aktash.svg'},
    {img: './assets/img/b2b/partners/augustina.svg'},
    {img: './assets/img/b2b/partners/sberbank.svg'},
  ]

  constructor(
    private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
  }

  getImage(element: any) {
    return this.sanitization.bypassSecurityTrustStyle( `url(${element})` );
  }
}
