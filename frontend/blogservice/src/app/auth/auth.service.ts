import {EventEmitter, Injectable, Output} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

export interface userCreds {
  token: string;
  userId: string;
  nick?: string;
}


@Injectable({providedIn: 'root'})
export class AuthService  {

  private verificationUrl = "/genuineCreds/";
  private token;
  private jwthelper = new JwtHelperService(); //TS2339: Property does not exist if not instantiated!
  public user: userCreds;
  public userLoggedInSuccessfully: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!this.tokenExpired(this.getToken()));
  public userLoggedInPanel:  BehaviorSubject<string> = new BehaviorSubject<string>(this.getPanelUrl());

  //@Output() userLoggedInSuccessfully: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
  }


  /*
    We deliberately not check  the userLoggedInSuccessfully in LocalStorage,
     as it does not provide any information for the token.
  */
  public getPanelUrl(): string{
    if(this.isLoggedIn()){
      return localStorage.getItem('panelUrl');
    } else{
      return ''
    };
  }
  public isLoggedIn(): boolean {
    return !this.tokenExpired(this.getToken());
  }

  private getToken(): string {
    this.token = localStorage.getItem('token'); //anti gia Sessionstorage
    return this.token;
  }

  private tokenExpired(token: string): boolean {
    return (token != null && this.jwthelper.isTokenExpired(token));
  }


  /*
      Ensure that the user has not manipulated the request values,
      and that there is indeed a user with this token.
   */
  private ensureGenuine(token: string, userId: string, nick: string): Observable<Boolean> {
    let genuser: userCreds = {
      token: token, nick: nick, userId: userId
    }

    let httpReq = {
      headers: {
        'Content-Type': 'application/json',
      }, user: genuser
    };

    return this.http.post(environment.backendUrl + this.verificationUrl, httpReq)
      .pipe(
        map(data => {
            return Boolean(data);
          }
        ));
  }


  public verifyLogIn(token: string, userId: string, nick: string): Promise<boolean> {
    this.user = {
      token: token, nick: nick, userId: userId
    }
    let bo: boolean;

    return new Promise<boolean>((resolve, reject) => {
      this.ensureGenuine(token, userId, nick).subscribe(resp => {
          if (resp == true) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('nickname', nick);
            this.userLoggedInSuccessfully.next(true);
            resolve(true);
          } else {
            this.userLoggedInSuccessfully.next(false);
            this.user = null;
            localStorage.setItem( "userPanelLink", null);
            resolve(false)
          }
        }
      )
    })

  }

}
