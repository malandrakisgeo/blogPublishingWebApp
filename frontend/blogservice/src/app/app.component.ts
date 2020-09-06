import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //providers: [ AuthService ], //allagh megalh
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //new
  constructor(private auth: AuthService) {
  }
}
