import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-chemistry',
  templateUrl: './chemistry.component.html',
  styleUrls: ['./chemistry.component.styl']
})
export class ChemistryComponent implements OnInit {
  mySlideOptions = {items: 1, dots: true, nav: false, autoHeight:true};
  Cases: Array<string> = [
    '../../../assets/img/b2c/chemistry/cases/1.jpg',
    '../../../assets/img/b2c/chemistry/cases/2.jpg',
    '../../../assets/img/b2c/chemistry/cases/3.jpg',
    '../../../assets/img/b2c/chemistry/cases/4.jpg',
    '../../../assets/img/b2c/chemistry/cases/5.jpg',
    '../../../assets/img/b2c/chemistry/cases/6.jpg',
    '../../../assets/img/b2c/chemistry/cases/7.jpg',
    '../../../assets/img/b2c/chemistry/cases/8.jpg',
    '../../../assets/img/b2c/chemistry/cases/9.jpg',
  ]  
  human_reviews = [
    {img: './assets/img/b2c/chemistry/otzivi/alina.jpg', comment: 'Сегодня у меня производили чистку двух кроватей с матрасами и дивана. Все сделал на отлично: быстро, аккуратно. Дали советы по сушке и последующей чистке. Я очень довольна!)', name: 'Алина Хамзина'},
    {img: './assets/img/b2c/chemistry/otzivi/irina.jpg', comment: 'Чистила диван после жирного пятна и развода от Ваниша для ковров, которым сама пыталась удалить пятно, но так и не смогла. Пятно и разводы с дивана исчезли полностью. Мастер очень вежливый, спокойный, быстро и четко сделал свою работу. А главное, при чистке не было никакого запаха чистящих средств, что для меня очень важно, т.к. в квартире живут маленькие дети и домашние животные. Большое спасибо! Буду обращаться к вам еще.', name: 'Ирина Назарова'},
    {img: './assets/img/b2c/chemistry/otzivi/ekaterina.jpg', comment: 'Заказывала чистку ковров и дивана от следов собачьего проживания и прочих неприятностей) Все вовремя и аккуратно, а главное никакого запаха. Спасибо за проделанную работу. Дальнейшего вам процветания!!!', name: 'Мария Ершова'},

  ]
  CalculateControl: FormGroup;
  phoneMask = [ '+','7',' ','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  faq: Array<object> = [
    {qestion: 'Как понять, что необходима химчистка?', answer: 'Ворс плохо реагирует на засаленность, чтобы мебель долгое время имела товарный вид необходимо делать химчистку раз в год. При этом процедура избавляет вас от пылевого клеща и остатков сухой кожи (пища для пылевого клеща), что особо важно для аллергиков и детей. При регулярной химчистки матраса пружины начинают скрипеть, поэтому химчистку матраса рекомендуется проводить только в случае его загрязнения или в случае если матрас эксплуатировался без водоотталкивающего чехла (оберегает матрас от проникновения пота во время сна). После химчистки необходимо приобрести защитный (водоотталкивающий) чехол.'},
    {qestion: 'Вредна ли химия для детей/аллергиков?', answer: 'Производитель учитывает то, что на мебели могут играть маленькие дети или сидеть аллергики, поэтому химия на 100% безопасна. В данном случае слово "химия" - носит негативный оттенок, поэтому будем называть ее моющими средствами.'},
    {qestion: 'Выезжаете ли вы за город?', answer: 'Мы выезжаем в любую точку города Казани в радиусе 50км.'},
    {qestion: 'Сколько будет стоить выезд?', answer: 'Стоимость выезда за город в радиусе 50км составляет 500₽. В черте города выезд бесплатный.'},
    {qestion: 'Возможно ли удалить запах мочи?', answer: 'Неприятный запах мочи, распространенная проблема для хозяев, будь это запах мочи ребенка или домашнего питомца. Мы используем специальное моющее средство на уксусной основе, которое как и другие средства имеют сертификаты соответствия и абсолютно безопасны для человека. Для выведения запаха мочи требуется проветриваемое помещение. После этой процедуры вы не будете чувствовать запаха уксуса, мочи и других неприятных запахов.'},
    {qestion: 'Выводите ли вы пятна?', answer: 'Мы сможем вывести 90% пятен. Есть перечень загрязнений, которые очень сложно вывести, например, вино, краска, лак, фломастеры, пластилин или клей.'},
    {qestion: 'Сколько времени это занимает?', answer: 'В среднем чистка одного элемента занимает около 1-го часа. При условии, что отсутсвуют въевшиеся пятна.'},
    {qestion: 'Какой запах остается?', answer: 'Первую неделю после химчистки у вас остается легкий запах свежести. Так как моющие средства биоразлагаемые, спустя 7 дней весь запах испарится.'},
    {qestion: 'За какое время моя мебель высохнет?', answer: 'Вы сможете эксплуатировать мебель по истечению 24 часов (полный цикл высыхания 48 часов). Мы не производим сушку мебели с помощью турбин, так как на резкое высыхание ворс плохо реагирует, лучше оставить комнату проветриваться.'},
    {qestion: 'Делаете ли химчистку ковров и ковролинов?', answer: 'Да, мы делаем химчистку ковров и ковролинов. Применяем разное оборудование в зависимости от загрязнений и объема очистки. Химчистка ковров осуществляется на территории заказчика.'},
  ]
  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.titleService.setTitle('Химчистка мягкой мебели в Казани | CleanUp service');

    this.CalculateControl = this.fb.group({
      phone: ['', Validators.required]
    });
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
