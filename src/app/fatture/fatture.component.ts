import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FattureService } from '../services/fatture.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.css']
})
export class FattureComponent implements OnInit {

  response!: any;
  pages: number[] = [];
  fatturaCorrente: number[] = [-50, -50];

  constructor(private fattSrv: FattureService, private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.fattSrv.getAllFatture(0).subscribe(res => {
      this.response = res;
      this.pages = Array(this.response.totalPages).fill(0).map((x, i) => i)
    })
  }

  goToPage(page: number) {
    this.response.content.length = 0;
    this.fattSrv.getAllFatture(page).subscribe(res => {
      this.response = res;
    })
  }

  eliminaFattura(id: number, index: number) {
    this.fattSrv.deleteFattura(id).subscribe();
    this.response.content.splice(index, 1);
    console.log(this.fatturaCorrente);
  }

  getIndexId(id: number, index: number) {
    this.fatturaCorrente = [id, index];
  }


  get tipoUser(): string | undefined {
    return this.authSrv.tipoUtente;
  }

}
