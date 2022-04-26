import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';

import { AuthService } from './services/auth.service';
import { ListaUtentiComponent } from './lista-utenti/lista-utenti.component';
import { ClientiComponent } from './clienti/clienti.component';
import { FattureComponent } from './fatture/fatture.component';
import { Signin2Component} from './signin2/signin2.component';
import { Login2Component } from './login2/login2.component'
import { AuthGuard } from './services/guard.service';
import { CanActivate } from '@angular/router';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

const routes: Routes = [

  { path: 'login2', component: Login2Component },
  { path: 'signin2', component: Signin2Component },
{ path: 'lista-utenti', component: ListaUtentiComponent, canActivate: [AuthGuard]},
  { path: 'clienti', component: ClientiComponent, canActivate: [AuthGuard] },
  { path: 'fatture', component: FattureComponent,canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard,AuthService, ListaUtentiComponent, ClientiComponent,FattureComponent ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


/*imports: [
  RouterModule.forRoot([
    {
      path: 'team/:id',
      component: TeamComponent,
      canActivate: ['canActivateTeam']
    }
  ])
],
providers: [
  {
    provide: 'canActivateTeam',
    useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
  }
]*/
