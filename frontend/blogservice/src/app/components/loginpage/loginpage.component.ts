import {Component, OnInit} from '@angular/core';
import {LoginserviceService} from "../../services/loginservice.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  private loginurl: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private loginserviceService: LoginserviceService) {

    this.loginurl = "/auth/google/";
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    window.location.href = environment.backendUrl+this.loginurl;
  }

}
