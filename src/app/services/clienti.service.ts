import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Clienti } from '../clienti/clienti';

@Injectable({
  providedIn: 'root'
})

export class ClientiService {

  constructor(private http: HttpClient) { }

  getClienti(page: number) {
    return this.http.get<any>(`${environment.baseUrl}/api/clienti?page=${page}&sort=id,ASC`)
  }

  getClienteById(id: number) {
    return this.http.get<Clienti>(`${environment.baseUrl}/api/clienti/${id}`);
  }

  getTipiCliente() {
    return this.http.get<any>(`${environment.baseUrl}/api/clienti/tipicliente`);
  }

  cancellaCliente(id: number) {
    return this.http.delete(`${environment.baseUrl}/api/clienti/${id}`)
  }


}
