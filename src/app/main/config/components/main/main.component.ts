import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/main/shared/service/server.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private ServerScv : ServerService) {
    this.ServerScv._loginserv.VerificarSession();
  }



  public CerrarSession() : void{
    this.ServerScv._loginserv.CerrarSession();
  }

}
