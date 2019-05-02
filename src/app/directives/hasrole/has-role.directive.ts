import { Directive, OnInit, ViewContainerRef, Input, TemplateRef } from '@angular/core';
import { myHTTPService } from 'src/app/services/HTTP/myhttp.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() hasRole: Array<string>;
  
  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>,
    private myHttp: myHTTPService
    ) { }

    ngOnInit(): void {
      this.getRoles()
        .subscribe( (data: any)=> {
          this.checkRoles(data.role);
        }, err=> {
          console.log(err);
        })
      
    }

    checkRoles(userRole: string) {
      if (!this.hasRole || this.hasRole.indexOf(userRole) != -1) {
          this.viewContainerRef.createEmbeddedView(this.template);
      } else {
          this.viewContainerRef.clear();
      }
    }

    getRoles() { // Делает каждый раз запрос на сервер
      return this.myHttp.getHTTP('/public/hasRole');
    }

}
