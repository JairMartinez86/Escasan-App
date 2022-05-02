import { Component } from '@angular/core';
import { ServerService } from './main/shared/service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Escalante Sanchez S.A.';

  constructor(public ServerScv : ServerService){
    this.ServerScv._Router.navigate(['/Login'], { skipLocationChange: true });
  }
}
