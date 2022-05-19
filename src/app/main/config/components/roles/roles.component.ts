import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public val = new Validacion();
  
  constructor(private ServerScv : ServerService) {
    this.val.add("txtRol", "1","LEN>", "0");
   }


 Cerrar() : void{
  /*this.viewContainerRef
    .element
    .nativeElement
    .parentElement
    .removeChild(this.viewContainerRef.element.nativeElement);*/

    this.ServerScv.CerrarFormulario();
    
}

  ngOnInit(): void {

    this.ServerScv.change.subscribe(s =>{

      if(s instanceof Array){
        if(s[0] == "DatosModal" && s[1] == "modal-registro-roles" ) {
          console.log(s[2]);
        }
      }

    });
    
  }

}
