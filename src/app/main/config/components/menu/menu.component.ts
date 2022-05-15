import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { DynamicNavDirective } from 'src/app/main/config/components/menu/nav/nav/dynamic-nav.directive';
import { DynamicFormDirective } from 'src/app/main/shared/directive/dynamic-form.directive';
import { ServerService } from 'src/app/main/shared/service/server.service';
import { UsuarioComponent } from '../usuario/usuario.component';
import { NavComponent } from './nav/nav/nav.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @ViewChild(DynamicNavDirective, { static: true }) dynamicNav!: DynamicNavDirective;
  @ViewChild(DynamicFormDirective, { static: true }) dynamicForm!: DynamicFormDirective;


  private str_NomModulo : string = "INICIO"
  private str_Modulo : string = ""


  @Input() public href: string | undefined;
  @HostListener('click', ['$event']) public onClick(event: Event): void {
    if (
      !this.href ||
      this.href == '#' ||
      (this.href && this.href.length === 0)
    ) {
      var element = <HTMLElement>event.target;

      
      if (element.tagName.toString().toLocaleLowerCase() == "a" && element.getAttribute("href") == "#") {
       
        this.AbrirFormulario(element.id);
      }

      event.preventDefault();
    }
  }

  

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


    if(this.str_NomModulo == m) return;

    this.str_Modulo = m;

    this.dynamicNav.viewContainerRef.clear()
    Escan_NAV = this.dynamicNav.viewContainerRef.createComponent(NavComponent);

    switch(m){
      case "SIS":
        this.str_NomModulo = "CONFIGURACIÓN";
        document.getElementById("mov_sis")?.classList.add('activo');
        break;

      case "FAC":
        this.str_NomModulo = "FACTURACIÓN";
        document.getElementById("mov_fac")?.classList.add('activo');
        break;
      
      default:
        this.str_NomModulo = "INICIO";
        document.getElementById("mov_inicio")?.classList.add('activo');
        break;
    }


    Escan_NAV.instance.str_Nombre = this.str_NomModulo
    Escan_NAV.instance.str_Modulo = this.str_Modulo

  }

  public CerrarSession() : void{
    this.ServerScv._loginserv.CerrarSession();
  }


  public AbrirFormulario(f : string) : void{

    switch(this.str_Modulo){
      case "SIS":
        this.Modulo_SIS(f)
        break;

      case "FAC":
        this.Modulo_FAC(f)
        break;
    }

    
  }


  private Modulo_SIS(f : string) : void{
    switch(f){
      case "LinkUsuario":
        
        this.dynamicForm.viewContainerRef.clear()
        let LinkUsuario  = this.dynamicForm.viewContainerRef.createComponent(UsuarioComponent);

        break;
    }
  }


  private Modulo_FAC(f : string) : void{

  }


  ngAfterContentInit(): void {
    this.AbrirModulo("");
  }

}