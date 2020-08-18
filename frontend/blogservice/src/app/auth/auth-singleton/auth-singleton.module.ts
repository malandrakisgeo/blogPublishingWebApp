import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../auth.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthSingletonModule {
  constructor(@Optional() @SkipSelf() parentModule?: AuthSingletonModule) {
    if (parentModule) {
      throw new Error(
        'GreetingModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<AuthSingletonModule> {
    return {
      ngModule: AuthSingletonModule,
      providers: [ {provide: AuthService } ]
    };
  }


}
