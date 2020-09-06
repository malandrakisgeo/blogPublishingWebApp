import {ChangeDetectorRef, Component, ModuleWithProviders, OnInit, Optional} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../environments/environment.prod";
import {AuthService} from "../../auth/auth.service"

@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css']
})


export class IndexpageComponent implements OnInit {
  text: any;
  public userPanelLink: String;
  public userLoggedIn: boolean;

  constructor(private http: HttpClient,
              private auth: AuthService,
  ) {
    /*this.auth.userLoggedInSuccessfully.subscribe(value => {
      this.userLoggedIn = value;
    });*/
    auth.userLoggedInSuccessfully.subscribe(value => {
      this.userLoggedIn = value
    });
    auth.userLoggedInPanel.subscribe(value => {
      this.userPanelLink = value
    });
  }


  ngOnInit() {
    //let obj = JSON.parse(this.getIndex());
    //this.text = obj.foo;
    this.text = this.altGet();
  }


  private getIndex() {
    //const headers = new HttpHeaders().set('Content-Type', 'json; charset=utf-8');
    //return this.http.get<String>(environment.backendUrl,{ headers, responseType: 'json'});
    this.http.get<object>(environment.backendUrl).subscribe((response: Response) => {
      return response.toString();
    });
  }

  private altGet() {
    //return this.http.get<any>(environment.backendUrl).map((res:any) => res);

  }

}
