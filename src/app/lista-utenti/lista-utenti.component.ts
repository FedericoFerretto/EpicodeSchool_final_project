import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { UtentiService } from '../services/utenti.service';
import { ListaUtenti } from './lista-utenti';


@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent implements OnInit {

  constructor(private call :AuthService, private usersSrv: UtentiService ) {}



    users!: ListaUtenti[];
  response!: any;
  pages: number[] = [];



  ngOnInit(): void {
    this.usersSrv.getAllListaUtenti(0).subscribe(res => {
      this.users = res.content;
      this.response = res;
      this.pages = Array(this.response.totalPages).fill(0).map((x, i) => i)
    })
  }

  goToPage(page: number) {
    this.users.length = 0;
    this.usersSrv.getAllListaUtenti(page).subscribe(res => {
      this.users = res.content;
      this.response = res;
    })
  }


   /* let order:string="id,ASC";
   this.call.dowloadListaUtenti(0,20,order);*/



}
