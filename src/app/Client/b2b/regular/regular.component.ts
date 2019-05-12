import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';


@Component({
  selector: 'app-regular',
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.styl']
})
export class RegularComponent implements OnInit {
  CalculateControl: FormGroup;
  phoneMask = [ '+','7',' ','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

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
  myCarouselOptions = {items: 3, dots: true, nav: true};

  Result: any = {
    fot: Number,
    itog: Number,
    itogMaterial: Number,
    managerWage: Number,
    material: Number,
    profit: Number,
    tinkoffCommission: Number,
    windowFond: Number,
  };
  displayeditog: String;
  displayeditogLast: String;
  Objects = [
    {photo: './assets/img/b2b/objects/technoavia.jpg',
    name: 'Казань, Декабристов 203, Техноавиа-Казань',
    tasks: 'Регулярная уборка помещений офисного типа, небольшого склада и комнаты приёма пиши организации в вечернее время..',
    itogs: 'Компания Техноавиа-Казань, до сих пор является постоянным клиентом компании КлинАп, и полностью довольная всеми производимыми услугами. На сегодняшний день идёт активное расширение сотрудничества и масштабов оказания клининговых услуг в других городах России.'
  },

    {photo: './assets/img/b2b/objects/autodoriya.jpg',
    name: 'Казань, Мазита Гафури 50, Автодория',
    tasks: 'Производить регулярную уборку небольшого офисного помещения и основного склада организации.',
    itogs: 'Компания Автодория, является постоянным клиентом нашей компании. На данный момент принимаем активное участие в расширении областей сотрудничества и продолжении вектора развития деловых отношений.'
  },

    {photo: './assets/img/b2b/objects/vault.jpg',
    name: 'Казань, Сеть компьютерных клубов VAULT',
    tasks: 'Регулярное поддержание чистоты, ежедневная уборка, сбор и вынос мусора, в помещениях компьютерного клуба.',
    itogs: 'Основной особенностью регулярного поддержания чистоты в компьютерном клубе, является его режим работы, он круглосуточный. Исходя из этого, была введена определённая схема и график работы исполнителей на объекте. Заказчик полностью доволен производимыми услугами.'
  },
  
    {photo: './assets/img/b2b/objects/medtehatomproject.jpg',
    name: 'Казань, Волгоградская 49, MTA-GROUP',
    tasks: 'Ежедневная, регулярная уборка офиса лаборатории радиационного контроля МТА.',
    itogs: 'Компания МТА-GROUP достаточно долго сменяла подрядчиков по организации уборочных работ в их офисе. Начиная от частных уборщиц и штатниц, до местных клининговых компаний. Мы закрыли все те проблемы, с которым они сталкивались с другими подрядчиками. Теперь компания является постоянным клиентом сервиса CleanUP. Заказчик полностью доволен качеством производимых услуг.'
  },

  ];
  RegularControl: Array<Object> = [
    {days: '30', translate: 'Без выходных'},
    {days: '25.8', translate: '6/1 - сб полный'},
    {days: '23.7', translate: '6/1 - сб не полный'},
    {days: '21.5', translate: '5/2'},
    {days: '15', translate: '2/2'},
    {days: '13', translate: '3 раза в неделю'},
    {days: '8.6', translate: '2 раза в неделю'},
    {days: '4.3', translate: 'Раз в неделю'},
    {days: '1', translate: 'Раз в месяц'}
  ];
  constructor(
    private fb: FormBuilder,
    private sanitization: DomSanitizer,
    private titleService: Title,
    private myHttp: myHTTPService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Уборка офисов в Казани | CleanUp service');

    this.CalculateControl = this.fb.group({
      area: ['', Validators.required],
      regular: ['', Validators.required],
      time: '',
      twice: false,
      phone: ['', Validators.required]
    });

    this.CalculateControl.valueChanges
    .subscribe(
      (value) => value
    );
  }

  sentOffer() {
    this.valid(this.CalculateControl)
    if ( this.CalculateControl.valid && !this.CalculateControl.get('phone').value.includes("_") ) {
      this.myHttp.postHTTP('/public/sentOfferByClient', {data: this.CalculateControl.value})
        .subscribe( (data: any) => {
          this.alert.openSnackBar( data.message );
        }, ( err: any ) => {
          this.alert.openSnackBar( err );
        })
    } else {
      this.alert.openSnackBar('Нужно заполнить все поля!');
    }
  }
  valid(group: FormGroup) {
    var copeLead: Object = group.controls;
    Object.keys(copeLead).forEach(key => {
      if (copeLead[key] instanceof FormControl) {
        copeLead[key].markAsTouched();
      } else {
        for (var x of copeLead[key].controls) {
            x.markAsTouched();
            for (let y in x.controls) {
              x.controls[y].markAsTouched();
            }
        }
      }
    });
  };

  dangerFile(img) {
    return this.sanitization.bypassSecurityTrustStyle( `transparent url(${img}) 50% 50% no-repeat /cover` );
  }

}
