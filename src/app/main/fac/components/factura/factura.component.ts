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

  public lstCliente: { IdCliente : Number, Codigo: String, Cliente: String, Ruc : String, Telefono : String, esEventual : boolean}[] = [];
  public lstPlazo: { IdPlazo: String, Dias: String }[] = [];
  public lstBodega: {IdBodega : Number, Codigo: String, Bodega: String, VendedorBod : String, ClienteBod : String }[] = [];
  public lstVendedor: { IdVendedor: String, Codigo: String, Vendedor: String  }[] = [];
  public lstProducto: {IdProducto : Number, Codigo: String, Producto: String}[] = [];
  public val = new Validacion();

  public bol_Exportacion : boolean = true;
  private str_Iva : string = "";


  //displayedColumns: string[] = ["Fila", "Codigo", "IdProducto",  "Cantidad", "EsBonificado", "Precio",
 // "SubTotal", "Descuento", "SubTotalNeto", "Impuesto", "Total"];

 MasterColumns: string[] = ["Codigo", "Producto", "Cantidad", "PorcDesc", "Bonif"];
 DetailColumns: string[] = ["Precio", "SubTotal", "Descuento", "Neto"];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  clickedRows = new Set<I_Detalle>();
  private _liveAnnouncer: any;

  
  public estadoPanel = true;

  constructor(private ServerScv : ServerService) { 
    this.val.add("txtCliente", "1","LEN>", "0");
    this.val.add("txtNombre", "1","LEN>=", "0");
    this.val.add("txtRuc", "1","LEN>=", "0");
    this.val.add("txtLimite", "1","LEN>=", "0");
    this.val.add("txtTelefono", "1","LEN>=", "0");
    this.val.add("txtDisponible", "1","LEN>=", "0");
    this.val.add("txtSerie", "1","LEN>", "0");
    this.val.add("txtFecha", "1","LEN>", "0");
    this.val.add("rdTipoVenta", "1","LEN>=", "0");
    this.val.add("txtBodega", "1","LEN>", "0");
    this.val.add("txtVendedor", "1","LEN>", "0");
    this.val.add("txtOrdenCompra", "1","LEN>=", "0");
    this.val.add("chkExportacion", "1","LEN>=", "0");
    this.val.add("rdIva", "1","LEN>=", "0");
    
  }
  


private _Evento(str_Evento : string) : void{

  switch(str_Evento)
  {
    case "Iniciar":
      this._Evento("Limpiar");
      this._BuscarBodega("");
      this._BuscarCliente("");
      this._BuscarProducto("");

      break;

    case "Limpiar":

      this.str_Iva = "1"
      this.bol_Exportacion = false;


      this.val.ValForm.get("txtCliente")?.setValue([]);
      this.val.ValForm.get("txtNombre")?.setValue("");
      this.val.ValForm.get("txtRuc")?.setValue("");
      this.val.ValForm.get("txtLimite")?.setValue("0.00");
      this.val.ValForm.get("txtTelefono")?.setValue("");
      this.val.ValForm.get("txtDisponible")?.setValue("0.00");
      this.val.ValForm.get("txtSerie")?.setValue("");
      this.val.ValForm.get("txtFecha")?.setValue("");
      this.val.ValForm.get("rdTipoVenta")?.setValue("Contado");
      this.val.ValForm.get("txtBodega")?.setValue([]);
      this.val.ValForm.get("txtVendedor")?.setValue([]);
      this.val.ValForm.get("txtOrdenCompra")?.setValue("");
      this.val.ValForm.get("chkExportacion")?.setValue(this.bol_Exportacion);
      this.val.ValForm.get("rdIva")?.setValue(this.str_Iva);
      

      break;
  }
}



//#region "EVENTOS CLIENTE"


private _BuscarCliente(datos : string) : void{

  if(datos == "")
  {
    this.ServerScv._facturaserv.b_Cliente(this.val.ValForm.get("txtBodega")?.value);
  }
  else
  {
    let _json = JSON.parse(datos);
    _json["d"].forEach((b: any) => {
      this.lstCliente.push({IdCliente : b.IdCliente, Codigo : b.Codigo, Cliente: b.Cliente, Ruc : b.Ruc, Telefono: b.Telefono, esEventual : b.esEventual});
    });

    if(this.lstCliente.length == 0) return;
    this.b_Buscar_Cliente_Eventual();
  }
  
}


private b_Buscar_Cliente_Eventual() : void
{
  let _Bodega : any = this.lstBodega.find(f => f.Codigo == String(this.val.ValForm.get("txtBodega")?.value))

  if(_Bodega == undefined) return;

  let _Eventual : any = this.lstCliente.find(f => f.IdCliente === _Bodega?.ClienteBod)

  if(_Eventual == undefined) return;

  if(this.val.ValForm.get("txtCliente")?.value != [])
  {
    let _Cliente : any = this.lstCliente.find(f => f.Codigo == String(this.val.ValForm.get("txtCliente")?.value));

    if(_Cliente != undefined)
    {
      if(!_Cliente?.esEventual && _Cliente?.IdCliente != _Bodega?.ClienteBod) return
    }
   

  }

  this.val.ValForm.get("txtCliente")?.setValue([_Eventual?.Codigo]);
  
}

//#endregion "EVENTOS CLIENTE"


//#region "EVENTOS BODEGA"


private _BuscarBodega(datos : string) : void{

  if(datos == "")
  {
    this.ServerScv._facturaserv.b_Bodega(this.ServerScv._loginserv.str_user, this.bol_Exportacion);
  }
  else
  {
    let _json = JSON.parse(datos);
  
    _json["d"].forEach((b: any) => {
      this.lstBodega.push({IdBodega : b.IdBodega, Codigo: b.Codigo, Bodega : b.Bodega, VendedorBod: b.VendedorBod, ClienteBod: b.ClienteBod});
    });

    if(this.lstBodega.length == 0) return;

    this.val.ValForm.get("txtBodega")?.setValue([this.lstBodega[0]?.Codigo]);

  }
  
}


public seleccion_Bodega(event: any) {
  if (event.added.length) {
      event.newSelection = event.added;
      let _Fila : any =  this.lstBodega.find(f => f.Codigo == event.added)
      this.val.ValForm.get("txtBodega")?.setValue([_Fila.Codigo]);
      this.b_Buscar_Cliente_Eventual();
  }
}

/*
public enter_Bodega(event : any){
  let _value = event.target.value;
  let _Fila : any = this.lstBodega.find(f => f.Codigo === String(_value))
  this.val.ValForm.get("txtBodega")?.setValue([]);
  if(_Fila == undefined) return;
  this.val.ValForm.get("txtBodega")?.setValue([_Fila.Codigo]);
  this.b_Buscar_Cliente_Eventual();
}

public focus_out_Bodega(event: any) {
  let _Fila : any = this.lstBodega.find(f => f.Codigo === String(this.val.ValForm.get("txtCodBodega")?.value))
  this.val.ValForm.get("txtBodega")?.setValue([]);
  if(_Fila == undefined) return;
  this.val.ValForm.get("txtBodega")?.setValue([_Fila.Codigo]);
  this.b_Buscar_Cliente_Eventual();
}*/


//#endregion "EVENTOS BODEGA"




//#region "EVENTOS PRODUCTO"

private _BuscarProducto(datos : string) : void{

  if(datos == "")
  {
    this.ServerScv._facturaserv.b_Producto();
  }
  else
  {
    let _json = JSON.parse(datos);
  
    _json["d"].forEach((b: any) => {
      this.lstProducto.push({IdProducto : b.IdProducto, Codigo: b.Codigo, Producto : b.Producto});
    });
  }
  
}
//#endregion "EVENTOS PRODUCTO"


  public singleSelection(event: any) {
    if (event.added.length) {
        event.newSelection = event.added;
        
    }


}




ExPortacion() :void{
  this.bol_Exportacion = !this.bol_Exportacion;

  if(!this.bol_Exportacion){
    this.str_Iva = "1" ;
    this.val.ValForm.get("rdIva")?.setValue(this.str_Iva);
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





  ngAfterContentInit(): void {
    this._Evento("Iniciar");
  }





  ngOnInit(): void {

    this.ServerScv.change.subscribe(s =>{
      if(s instanceof Array){
        if(s[0] == "DatosModal" && s[1] == "modal-factura-venta" ) {
          console.log(s[2]);
        }
      }
    });


    
    this.ServerScv._facturaserv.change.subscribe(s =>{

      if(s instanceof Array){
        if(s[0] == "Datos_Bodega") {
          this._BuscarBodega(s[1])
        }

        if(s[0] == "Datos_Cliente") {
          this._BuscarCliente(s[1])
        }

        if(s[0] == "Datos_Producto") {
          this._BuscarProducto(s[1])
        }
      }

    });

  }

  

}
