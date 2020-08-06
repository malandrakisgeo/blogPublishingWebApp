import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginpageComponent} from "./components/loginpage/loginpage.component";
import {UserpostpanelComponent} from "./components/userpostpanel/userpostpanel.component";



export const routes: Routes = [
  { path: 'login', component: LoginpageComponent },
  { path: 'userPostPanel', component: UserpostpanelComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
