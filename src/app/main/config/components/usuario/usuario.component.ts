import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public bol_HidePass : boolean = true;
  public cities: { name: string, id: string }[] = [];

  constructor(private ServerScv : ServerService) { }

  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
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
    this.cities = [{ name: 'London', id: 'UK01' }, { name: 'Sofia', id: 'BG01'}];
  }

}
