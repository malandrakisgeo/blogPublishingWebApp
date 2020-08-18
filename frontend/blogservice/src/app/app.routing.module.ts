import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginpageComponent} from "./components/loginpage/loginpage.component";
import {UserpostpanelComponent} from "./components/userpostpanel/userpostpanel.component";
import {ModifyPostComponent} from "./components/modify-post/modify-post.component";
import {AuthGuardServiceService} from "./auth/auth-guard-service.service";


export const routes: Routes = [
  {path: 'login', component: LoginpageComponent},
  {path: 'userPostPanel', component: UserpostpanelComponent},
  {path: 'modifyPost/:postuuid', component: ModifyPostComponent, canActivate: [AuthGuardServiceService]},
  {path: 'modifyPost/:postuuid/:version', component: ModifyPostComponent, canActivate: [AuthGuardServiceService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
