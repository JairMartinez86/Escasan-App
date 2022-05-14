import { Component, ViewChild } from '@angular/core';
import { DynamicFormDirective } from 'src/app/main/shared/directive/dynamic-form.directive';

export interface I_Nav {
  EsMenu : boolean;
  Modulo : string;
  ModuloNombre : string;
  Id : string;
  Link : string;
  MenuPadre : string;
  Activo : boolean;
  }
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})



export class NavComponent{

  public str_Nombre : string = "";
  public str_Modulo : string = "";

  @ViewChild(DynamicFormDirective, { static: true }) dynamicForm!: DynamicFormDirective;

  

  public Perfiles: I_Nav[] = [
    {EsMenu: true, Modulo : "SIS", ModuloNombre : "Configuración", Id: "navUsuario", Link : "Usuarios", MenuPadre : "", Activo : false},
    {EsMenu: false, Modulo : "SIS", ModuloNombre : "Configuración", Id: "LinkUsuario", Link : "Nuevo Usuario", MenuPadre : "navUsuario", Activo : false},
    {EsMenu: false, Modulo : "SIS", ModuloNombre : "Configuración", Id: "LinkRegistroUsuario", Link : "Registro Usuarios", MenuPadre : "navUsuario", Activo : false},



    {EsMenu: false, Modulo : "FAC", ModuloNombre : "Facturación", Id: "navProforma", Link : "Proforma", MenuPadre : "", Activo : false},

    
  ]
  
  constructor() { }

  public Menu() : I_Nav[]{
    return this.Perfiles.filter(f => f.MenuPadre == "" && f.Modulo ==  this.str_Modulo)
  }

  public SubMenu(Menu : string) : I_Nav[]{
    return this.Perfiles.filter(f => f.MenuPadre == Menu && f.Modulo ==  this.str_Modulo);
  }



}
