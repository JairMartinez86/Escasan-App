import { Component, OnInit } from '@angular/core';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {

  public lstCliente: { Codigo: string, Nombre: string }[] = [];
  public lstPlazo: { IdPlazo: string, Dias: string }[] = [];
  public lstBodega: { Codigo: string, Bodega: string }[] = [];
  public lstVendedor: { IdVendedor: string, Codigo: string, Vendedor: string  }[] = [];
  public val = new Validacion();
  
  public estadoPanel = true;

  constructor(private ServerScv : ServerService) { 
    this.val.add("txtCliente", "1","LEN>", "0");
    this.val.add("txtNombre", "1","LEN>=", "0");
    this.val.add("txtRuc", "1","LEN>=", "0");
    this.val.add("txtCedula", "1","LEN>=", "0");
    this.val.add("txtTelefono", "1","LEN>=", "0");
    this.val.add("txtCelular", "1","LEN>=", "0");
    this.val.add("txtCorreo", "1","LEN>=", "0");
    this.val.add("txtSerie", "1","LEN>", "0");
    this.val.add("txtFecha", "1","LEN>", "0");
    this.val.add("txtDias", "1","LEN>", "0");
    this.val.add("txtBodega", "1","LEN>", "0");
    this.val.add("txtVendedor", "1","LEN>", "0");


  }
  


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}

  Cerrar() : void{
      this.ServerScv.CerrarFormulario();
  }

  ngOnInit(): void {
  }

}
