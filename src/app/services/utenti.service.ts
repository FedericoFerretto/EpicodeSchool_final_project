import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllListaUtenti(page: number) {
    return this.http.get<any>((`${this.baseURL}/api/users/?page=${page}&size=20`));
  }
}
