import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Conexion } from '../../shared/class/conexion';
import { DialogoComponent } from '../../shared/components/dialogo/dialogo.component';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private _Cnx = new Conexion();
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private _Router: Router, private http : HttpClient, private _Dialog: MatDialog) { }


  
  public b_Cliente(CodBodega : String): void{
    this.http.get<any>(this._Cnx.Url() + "Factura/Bodega" + "?CodBodega=" + CodBodega).subscribe(
      datos => {
        this.change.emit(["Datos_Cliente", datos]);
      },
      err =>{
        this.Msj();
      }

    );
  }

  public b_Bodega(Usuario : String, esExportacion : Boolean): void{
    this.http.get<any>(this._Cnx.Url() + "Factura/Bodega" + "?Usuario=" + Usuario + "&esExportacion=" + esExportacion).subscribe(
      datos => {
        this.change.emit(["Datos_Bodega", datos]);
      },
      err =>{
        this.Msj();
      }

    );
  }



  public b_Producto(): void{
    this.http.get<any>(this._Cnx.Url() + "Factura/Producto").subscribe(
      datos => {
        this.change.emit(["Datos_Producto", datos]);
      },
      err =>{
        this.Msj();
      }

    );
  }


  private Msj () : void{

    
    let s : string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\""+ 1 + "\",\"Mensaje\":\""+ "Error al conectar con el servidor."+ "\"}"+ ", \"count\":"+ 0 + ", \"esError\":"+ 1 + "}";
       
    let _json = JSON.parse(s);
  
    this._Dialog.open(DialogoComponent, {
      data: _json["msj"],
    });
  
  }

  
}


