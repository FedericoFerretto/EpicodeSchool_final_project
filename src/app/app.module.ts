import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { CanActivate } from '@angular/router';
import { ListaUtentiComponent } from './lista-utenti/lista-utenti.component';
import { ClientiComponent } from './clienti/clienti.component';
import { FattureComponent } from './fatture/fatture.component';
import { FormsModule } from '@angular/forms';
import { Login2Component } from './login2/login2.component';
import { Signin2Component } from './signin2/signin2.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { InterceptorInterceptor } from './interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,

    ListaUtentiComponent,
    ClientiComponent,
    FattureComponent,
    Login2Component,
    Signin2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}




