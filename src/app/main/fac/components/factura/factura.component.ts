import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Validacion } from 'src/app/main/shared/class/validacion';
import { ServerService } from 'src/app/main/shared/service/server.service';


export interface I_Detalle {
  Index : Number;
  Codigo : string;
  Producto : string
  Cantidad : Number,
  PorcDesc : Number,
  Bonif : string,
  Precio : Number,
  SubTotal : Number,
  Descuento : Number
  Neto : Number
  }

  let ELEMENT_DATA: I_Detalle[] = [
    {Index: 1, Codigo : '05-B1-AR11', Producto : 'Aretes de Identificación Animal: Hembra Visual Tipo Bandera y Macho de Botón de Cierre/Hembra de Botón Visual y Macho de Botón de Cierre (PARES)', Cantidad : 10, PorcDesc : 0, Bonif : "", Precio : 54.25, SubTotal : 542.5, Descuento : 0, Neto: 542.5},
    {Index: 2, Codigo : '02-B2-AB01', Producto : 'ABRAZADERA T/CLAMP/ACERO INOXIDABLE', Cantidad : 1, PorcDesc : 0, Bonif : "Si", Precio : 35.25, SubTotal : 35.25, Descuento : 35.25, Neto: 0},
  ];

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FacturaComponent implements OnInit {

  public lstCliente: { Codigo: string, Nombre: string }[] = [];
  public lstPlazo: { IdPlazo: string, Dias: string }[] = [];
  public lstBodega: { Codigo: string, Bodega: string }[] = [];
  public lstVendedor: { IdVendedor: string, Codigo: string, Vendedor: string  }[] = [];
  public val = new Validacion();

  public bol_Exportacion : boolean = false;


  //displayedColumns: string[] = ["Fila", "Codigo", "IdProducto",  "Cantidad", "EsBonificado", "Precio",
 // "SubTotal", "Descuento", "SubTotalNeto", "Impuesto", "Total"];

 MasterColumns: string[] = ["Codigo", "Producto", "Cantidad", "PorcDesc", "Bonif"];
 DetailColumns: string[] = ["Precio", "SubTotal", "Descuento", "Neto"];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<I_Detalle>();
  private _liveAnnouncer: any;

  
  public estadoPanel = true;

  constructor(private ServerScv : ServerService) { 
    this.val.add("txtCodCliente", "1","LEN>", "0");
    this.val.add("txtCliente", "1","LEN>", "0");
    this.val.add("txtNombre", "1","LEN>=", "0");
    this.val.add("txtRuc", "1","LEN>=", "0");
    this.val.add("txtLimite", "1","LEN>=", "0");
    this.val.add("txtTelefono", "1","LEN>=", "0");
    this.val.add("txtDisponible", "1","LEN>=", "0");
    this.val.add("txtSerie", "1","LEN>", "0");
    this.val.add("txtFecha", "1","LEN>", "0");
    this.val.add("txtDias", "1","LEN>", "0");
    this.val.add("txtCodBodega", "1","LEN>", "0");
    this.val.add("txtBodega", "1","LEN>", "0");
    this.val.add("txtCodVendedor", "1","LEN>", "0");
    this.val.add("txtVendedor", "1","LEN>", "0");
    this.val.add("txtOrdenCompra", "1","LEN>=", "0");
    this.val.add("chkExportacion", "1","LEN>=", "0");
    
    
  }
  


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
    }
}




ExPortacion() :void{
  this.bol_Exportacion = !this.bol_Exportacion;
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


  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }

  Buscar(Index : Number){
    return ELEMENT_DATA.filter( f=> f.Index == Index)
  }
   /*************************************************************************/

  Cerrar() : void{
      this.ServerScv.CerrarFormulario();
      this.ServerScv.change.emit(["CerrarModal", "modal-factura-venta", undefined]);
  }

  ngOnInit(): void {

    this.ServerScv.change.subscribe(s =>{

      if(s instanceof Array){
        if(s[0] == "DatosModal" && s[1] == "modal-factura-venta" ) {
          console.log(s[2]);
        }
      }

    });

  }

}
