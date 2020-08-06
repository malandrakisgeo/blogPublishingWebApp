import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Account} from "../models/account";
import {response} from "express";

@Injectable()
export class LoginserviceService {
  private loginurl: string;

  constructor(private http: HttpClient
  ) {
    this.loginurl = "/auth/google/";

  }


}
