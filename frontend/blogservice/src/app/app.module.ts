import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {IndexpageComponent} from './components/indexpage/indexpage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app.routing.module";
import {LoginserviceService} from "./services/loginservice.service";
import {UserpostpanelComponent} from "./components/userpostpanel/userpostpanel.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    IndexpageComponent,
    UserpostpanelComponent,
    LoginpageComponent
  ],
    imports: [
        BrowserModule, HttpClientModule, AppRoutingModule, CKEditorModule
      //gia na mporeis na steileis get requests prepei to httpclientmodule na einai edw.
      //Epishs, to approutingmodule doulevei, enw to routermodule oxi
    ],
  providers: [LoginserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
