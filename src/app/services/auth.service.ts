import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import { HttpClient, HttpHeaders } from '@angular/common/http';
/*import { JwtHelperService } from '@auth0/angular-jwt';*/


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  login(username: string, password: string){
    return this.httpclient.post(environment.baseUrl + '/api/auth/login', {username, password}
    )
  }

  signup(username: string, email: string, password: string, role: any){
    var ruoli: string[] = [role]
    return this.httpclient.post(environment.baseUrl + '/api/auth/signup', {username, email, password, ruoli}
    )
  }


  tipoUtente: string | undefined;
  public accessToken : string = '';

  setToken(accessToken: string){

    this.accessToken = accessToken;
    localStorage.setItem('token', accessToken )
  }



  public isAuthenticated(): boolean {
    let user = localStorage.getItem('user')
    if (user!=null){

      return true ;
    }
    else{
      return false
    }
  }

 /* dowloadListaUtenti(pagina:number, size: number, sort:string) {
    var headers:HttpHeaders=new HttpHeaders();
    let token=localStorage.getItem('token');
    headers.append("Authorizations",token||'');
    headers.append("X-TENANT-ID",'fe_0122a');
    return this.httpclient.post(environment.baseUrl + '/api/clienti?page='+pagina.toString()+'&size='+size.toString()+'&sort='+sort ,"",{"headers":headers});
  }  */



}

