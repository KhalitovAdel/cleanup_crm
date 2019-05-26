import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../components/dialog/dialog.component';


@Component({
  selector: 'app-regular',
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.styl']
})
export class RegularComponent implements OnInit {

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
  b2b_otzovi = [
    {img: './assets/img/b2b/otzovi/kulick.jpg', comment: 'Тетя Люба, которая раньше убирала у нас в офисе, перестала справляться, да и болеть часто стала. Было принято решение обратиться в клининговую компанию. Выбор пал на эту (отзывы в интернете хорошие были). Все чисто, все быстро и недорого. Благодарим и надеемся на тесное сотрудничество в дальнейшем!', name: 'Лариса Кулик'},
    {img: './assets/img/b2b/otzovi/sitnikov.jpg', comment: 'У нас порядка 1500 квадратных метров. Довольно приличная по размеру площадь. Сейчас такое время, что все, что возможно, частный бизнес отдаёт на аутсорсинг. Мы тоже идем в ногу со временем. Помимо этого, у нас полностью белый бизнес и нам важно показывать расходы. Клининг – одна из статей, которую мы закладываем в бюджет. Сотрудника нанимать – не вижу смысла. Считаю, это прошлый век и лишние ресурсозатраты по управлению. Думаю, коллеги мои меня сейчас понимают. Компанию CleanUp от себя лично могу советовать – с работой справляются на ура.', name: 'Сергей Сытников'},
    {img: './assets/img/b2b/otzovi/kolvasheva.jpg', comment: 'Клиентом компании CleanUp мы являемся уже более года. Меня, как владельца компании все устраивает. Клинеры приходят вовремя, никогда не мешают моим сотрудникам работать. До этого у нас была уборщица, но, так как метраж площади у нас сравнительно небольшой 400 метров – мы отказались от этой вакансии и отдали чистоту нашего офиса на аутсорсинг. В моей ситуации это выгоднее, чем платить сотруднику. Да и меньше нерабочих разговоров в офисе.', name: 'Злата Колвашева'},
  ]

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

  constructor(
    private sanitization: DomSanitizer,
    private titleService: Title,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Уборка офисов в Казани | CleanUp service');
  }

  dangerFile(img) {
    return this.sanitization.bypassSecurityTrustStyle( `transparent url(${img}) 50% 50% no-repeat /cover` );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      //width: '250px',
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
