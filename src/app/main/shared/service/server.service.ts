import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../config/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {


    constructor( public _Router: Router, public _Dialog: MatDialog, public _loginserv : LoginService){;
    }
}
