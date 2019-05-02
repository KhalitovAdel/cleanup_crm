import { Directive, OnInit, ViewContainerRef, Input, TemplateRef } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';
import { CookieService } from 'ngx-cookie-service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() hasRole: Array<string>;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>,
    private myHttp: myHTTPService,
    private cookieService: CookieService
    ) { }

    ngOnInit(): void {
      var cookie: any = JSON.parse(this.cookieService.get('cart').replace('j:',''));
      this.checkRoles(cookie.role)
    }

    checkRoles(userRole: string) {
      if (!this.hasRole || this.hasRole.indexOf(userRole) != -1) {
          this.viewContainerRef.createEmbeddedView(this.template);
      } else {
          this.viewContainerRef.clear();
      }
    }

    getRoles() { // Делает каждый раз запрос на сервер
      console.log("делаю запрос")
      return this.myHttp.getHTTP('/public/hasRole');
    }

}
