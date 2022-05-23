import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';


export interface I_Detalle {
  Fila : string;
  Codigo : string;
  Producto : string
  Operacion : string,
  Valor : string
  }

  let ELEMENT_DATA: I_Detalle[] = [
    {Fila: "1", Codigo : '05-B1-AR11', Producto : 'Aretes de Identificación Animal: Hembra Visual Tipo Bandera y Macho de Botón de Cierre/Hembra de Botón Visual y Macho de Botón de Cierre (PARES)', Operacion : "Cantidad", Valor : "10"},
    {Fila: "", Codigo : "", Producto : '', Operacion : "Precio", Valor : "25.5"},
    {Fila: "", Codigo : "", Producto : '', Operacion : "Bonificado", Valor : ""},
    {Fila: "", Codigo : "", Producto : '', Operacion : "Descuento", Valor : "2.5"},

    {Fila: "2", Codigo : '02-B2-AB01', Producto : 'ABRAZADERA T/CLAMP/ACERO INOXIDABLE', Operacion : "Cantidad", Valor : "10"},
    {Fila: "", Codigo : "", Producto : '', Operacion : "Precio", Valor : "40.55"},
    {Fila: "", Codigo : "", Producto : '', Operacion : "Bonificado", Valor : "Si"},
    {Fila: "", Codigo : "", Producto : '', Operacion : "Descuento", Valor : "4.55"},
  ];

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


  //displayedColumns: string[] = ["Fila", "Codigo", "IdProducto",  "Cantidad", "EsBonificado", "Precio",
 // "SubTotal", "Descuento", "SubTotalNeto", "Impuesto", "Total"];

 displayedColumns: string[] = ["Codigo", "Producto",  "Operacion", "Valor",];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<I_Detalle>();
  private _liveAnnouncer: any;

  
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




  /*************************EVENTOS TABLA************************************/

  
  /** Announce the change in sort state for assistive technology. */
  announceSort(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  
 



  clickRow(evento : string, row : any){


  }

   /*************************************************************************/

  Cerrar() : void{
      this.ServerScv.CerrarFormulario();
  }

  ngOnInit(): void {
  }

}
