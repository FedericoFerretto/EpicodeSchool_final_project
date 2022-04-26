import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClientiService } from '../services/clienti.service';
import { FattureService } from '../services/fatture.service';


@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit {
  response!: any;
  pages: number[] = [];
  clienteCorrente: number[] = [-50, -50];

  constructor(private clientiSrv: ClientiService, private fattSrv: FattureService, private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.clientiSrv.getClienti(0).subscribe(res => {
      this.response = res;
      this.pages = Array(this.response.totalPages).fill(0).map((x, i) => i)
      console.log(this.response);

    })
  }

  goToPage(page: number) {
    this.response.content.length = 0;
    this.clientiSrv.getClienti(page).subscribe(res => {
      this.response = res;
    })
  }

  get tipoUser(): string | undefined {
    return this.authSrv.tipoUtente;
  }

}


