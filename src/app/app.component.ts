import { Component, OnInit } from '@angular/core';
import { ServerService } from './main/shared/service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Escalante Sanchez S.A.';

  constructor(public ServerScv : ServerService){
    this.ServerScv._Router.navigate(['/Login'], { skipLocationChange: true });
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', function (e) {
      var confirmationMessage = 'o/';
      e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      return confirmationMessage; // Gecko, WebKit, Chrome <34
    });
  }
}
