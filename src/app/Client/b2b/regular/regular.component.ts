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
  
  mySlideImages = [1,2,3] .map ((i) => `https://picsum.photos/640/480?image=${i}`);
  myCarouselImages = [1,2,3,4,5,6] .map ((i) => `https://picsum.photos/640/480?image=${i}`);
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
    {img: 'http://xn--80apfeln.xn--p1ai/assets/templates/cleanup/content/logo_partners/taif1.png'},
    {img: 'http://xn--80apfeln.xn--p1ai/assets/templates/cleanup/content/logo_partners/bilyar.svg'},
    {img: 'http://xn--80apfeln.xn--p1ai/assets/templates/cleanup/content/logo_partners/марани.png'},
    {img: 'http://xn--80apfeln.xn--p1ai/assets/templates/cleanup/content/logo_partners/neofit.png'},
    {img: 'http://xn--80apfeln.xn--p1ai/assets/templates/cleanup/content/logo_partners/big_funny.png'},
    {img: 'http://xn--80apfeln.xn--p1ai/assets/templates/cleanup/content/logo_partners/aktash.svg'},
    {img: 'http://xn--80apfeln.xn--p1ai/assets/templates/cleanup/content/logo_partners/augustina.svg'},
    {img: 'http://xn--80apfeln.xn--p1ai/assets/templates/cleanup/content/logo_partners/sberbank.svg'},
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
    {photo: 'http://xn--80apfeln.xn--p1ai/assets/components/phpthumbof/cache/segmenti.9884f94598760df9b521cc6636a6d77c.png',
    name: 'Зеленодольский район - Коттеджный комплекс класса "Элит"',
    tasks: 'Комплексная послестроительная уборка коттеджей и прилегающей к домам территории. Включая вывоз крупно строительного мусора с объектов, а также мытье окон и крыш коттеджей.',
    time: '2 рабочих дня – 1 коттедж.',
    itogs: 'Комплекс «Загородный клуб», являлся одним из постоянных клиентов компании, на момент постройки и ведения строительных работ самого комплекса. После завершения строительства, многие дома обслуживаются на регулярной основе ежедневной уборки.'
    },

    {photo: 'http://xn--80apfeln.xn--p1ai/assets/components/phpthumbof/cache/65803636.365318bffa7346de4b0f7204beb31d44.jpg',
    name: 'Казань, Биляр Палас Отель ',
    tasks: 'Полное мытье остекления здания отеля, 2 раза в год. ',
    time: '1-2 рабочих дня.',
    itogs: 'Была сформирована постоянная бригада альпинистов, для мытья остекления здания отеля. Благодаря постоянной бригаде, исполнители знали чётко все особенности и нюансы фасада здания, что позволило производить мытье окон в столь кратчайшие сроки, не выбиваясь из графиков и сроков работ.'
    },

    {photo: 'http://xn--80apfeln.xn--p1ai/assets/components/phpthumbof/cache/avgustina.a970fd3b4a9f36ce1fa97809a004aedb.jpg',
    name: 'Казань, торговая сеть Августина, более 85 точек',
    tasks: 'Регулярное поддержание чистоты внешнего остекления и фасадов всех точек торговой сети в городе. В частности, удаление рекламных объявлений и граффити рисунков с фасадов продуктовых точек. В течение всего летнего периода.',
    time: 'Регулярной поддержание чистоты в течение летнего периода времени.',
    itogs: 'По данной задаче, была сформирована мобильная бригада клинеров, которая ежедневно производила очистку и мытье фасадов, окон торговой сети. За один рабочий день производилась тщательная уборка более 5 торговых точек. Особое внимание уделялось качественной чистке фасада магазинов от красок граффити и клея от рекламных объявлений. Торговая сеть является постоянным заказчиком нашей компании, довольны результатом и качеством исполняемых работ.'
    },
  
    {photo: 'http://xn--80apfeln.xn--p1ai/assets/components/phpthumbof/cache/e3c998cc85286304939e723997a15284.db0b3318879f9d11da7bd6b8ff959e43.jpg',
    name: 'Казанская Ярмарка, выставка "Нефть, Газ, Нефтехимия" ',
    tasks: 'Подготовка рекламного стенда к открытию выставки. Послестроительная уборка, от гипсовой пыли и всевозможных остатков строительной грязи. Деликатная чистка светодиодных конструкций, а также стеклянных стендов с продукцией компании.',
    time: '1 рабочий день.',
    itogs: 'Выполнена послестроительная уборка стенда, с учётом всех пожеланий заказчика. А также, осуществлялось регулярное поддержание чистоты на стенде, во время проведения выставки. Заказчик остался полностью доволен произведенными услугами.'
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
      this.myHttp.postHTTP('http://localhost:3000/sentOfferByClient', {data: this.CalculateControl.value})
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
