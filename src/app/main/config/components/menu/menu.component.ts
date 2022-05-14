import { Component, ViewChild } from '@angular/core';
import { DynamicChildLoaderDirective } from 'src/app/main/shared/directive/dynamic-child-loader.directive';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { NavComponent } from './nav/nav/nav.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @ViewChild(DynamicChildLoaderDirective, { static: true }) dynamicChild!: DynamicChildLoaderDirective;


  private str_Modulo : string = "INICIO"


  constructor(private ServerScv : ServerService) {
    this.ServerScv._loginserv.VerificarSession();
  }


  public AbrirModulo(m : string) : void{
    let Escan_NAV : any;



    let parent  = document.getElementById("modulos")?.getElementsByTagName('a');
    let child = Array.prototype.slice.call(parent)

    Array.from(child).forEach((element) => {
      element?.classList.remove('activo');
    });


    if(this.str_Modulo == m) return;

    this.dynamicChild.viewContainerRef.clear()
    Escan_NAV = this.dynamicChild.viewContainerRef.createComponent(NavComponent);

    switch(m){
      case "SIS":
        this.str_Modulo = "CONFIGURACIÓN";
        document.getElementById("mov_sis")?.classList.add('activo');
        break;

      case "FAC":
        this.str_Modulo = "FACTURACIÓN";
        document.getElementById("mov_fac")?.classList.add('activo');
        break;
      
      default:
        this.str_Modulo = "INICIO";
        document.getElementById("mov_inicio")?.classList.add('activo');
        break;
    }


    Escan_NAV.instance.str_Nombre = this.str_Modulo
    Escan_NAV.instance.str_Modulo = m

  }

  public CerrarSession() : void{
    this.ServerScv._loginserv.CerrarSession();
  }

  ngAfterContentInit(): void {
    this.AbrirModulo("");
    console.log(1)
  }

}
