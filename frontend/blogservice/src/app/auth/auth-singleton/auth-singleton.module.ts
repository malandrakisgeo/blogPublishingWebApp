import {Injectable, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "../auth.service";


@NgModule({
  imports: [
    CommonModule
  ]
})
@Injectable({providedIn: 'root'})
export class AuthSingletonModule {
  constructor(@Optional() @SkipSelf() parentModule?: AuthSingletonModule) {
    if (parentModule) {
      throw new Error(
        'AuthModule already initialized');
    }
  }

  static forRoot() /*: ModuleWithProviders<AuthSingletonModule>*/ {
    return {
      ngModule: AuthSingletonModule,
      // providers: [ {provide: AuthService } ]
      providers: [AuthService]
    };
  }
}

