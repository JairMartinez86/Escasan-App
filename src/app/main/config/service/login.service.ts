
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Conexion } from '../../shared/class/conexion';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _Cnx = new Conexion();
  @Output() change: EventEmitter<any> = new EventEmitter();

  private isCancel : boolean = false;
  public isOpen : boolean = false;
  public isLogin : boolean = false;
  public bol_remenber : boolean = false;

  private Nombre : string = "";
  private str_Form : string = "";
  private str_user : string = "";
  private str_pass : string = "";
  private str_Fecha : string = "";


  constructor(private http : HttpClient) { }


  VerificarSession() {


    if(localStorage.getItem("User") != null)
    {
      this.str_user = <string>localStorage.getItem("User");
      this.str_pass = <string>localStorage.getItem("Pwd");
      this.Nombre = <string>localStorage.getItem("Nombre");
      this.bol_remenber = true;
    }

    if(this.str_user == "") {
      this.CerrarSession();
      return;
    }
    if(this.str_pass == "") {
      this.CerrarSession();
      return;
    }

    this.ValidarSession(this.str_user, this.str_pass);

    return;
  }

  GuardarSession(bol_remenber : boolean, str_user : string, str_pass : string, str_Nombre : string, str_Fecha : string ) : void
  {
    this.Nombre = str_Nombre;
    this.str_user = str_user;
    this.str_pass = str_pass;
    this.str_Fecha = str_Fecha;
    this.bol_remenber = bol_remenber;

    if(bol_remenber)
    {
      localStorage.setItem('Nombre', str_Nombre);
      localStorage.setItem('User', str_user);
      localStorage.setItem('Pwd', str_pass);
      localStorage.setItem('Fecha', str_Fecha);
    }

    sessionStorage.setItem('Nombre', str_Nombre);
    sessionStorage.setItem('User', str_user);
    sessionStorage.setItem('Pwd', str_pass);
    sessionStorage.setItem('Fecha', str_Fecha);

    this.isLogin = true;
    /*this.router.navigate(['/main'], { skipLocationChange: false });
    this.change.emit(this.str_Form);*/
  }


  
  CerrarSession() : void{
    
    this.str_user = "";
    this.str_pass = "";
    this.str_Fecha = "";

    localStorage.removeItem("User");
    localStorage.removeItem("Pwd");
    localStorage.removeItem("Fecha");
    localStorage.removeItem("Nombre");

    sessionStorage.removeItem("User");
    sessionStorage.removeItem("Pwd");
    sessionStorage.removeItem("Fecha");
    sessionStorage.removeItem("Nombre");

    this.isLogin = false;

    /*this.change.emit("CerrarTodo");
    this.router.navigate(['/login'], { skipLocationChange: false });*/
  }


  ValidarSession(str_user : string, str_Pass : string) {

    return this.http.get<any>(this._Cnx.Url() + "Usuario" + "?usr="+str_user+"&pwd="+ str_Pass).subscribe(
      datos => {
        this.change.emit(JSON.parse(datos));
      }
    );

  }



  InicioSesion(str_user : string, str_pass : string, bol_recordar : boolean) : void {

     this.http.get<any>(this._Cnx.Url() + "Usuario" + "?usr="+str_user+"&pwd="+ str_pass).subscribe(
      datos => {

        
        let _json = (JSON.parse(datos));
        this.bol_remenber = bol_recordar;

        if(Object.keys(_json["d"]).length > 0)
        {

          this.GuardarSession(this.bol_remenber,  this.str_user, this.str_pass, _json["d"][0]["Nombre"], _json["d"][0]["Fecha"]);
          this.change.emit(_json);
        }
        else
        {
          this.CerrarSession();
        }

        
      },
      err =>{

        let s : string = "{ \"d\":  [{ }],  \"msj\": " + "{\"Codigo\":\""+ 1 + "\",\"Mensaje\":\""+ "Error al conectar con el servidor."+ "\"}"+ ", \"count\":"+ 1 + ", \"esError\":"+ 1+ "}";
        this.change.emit(JSON.parse(s));
      }
    );

  }
  

}
