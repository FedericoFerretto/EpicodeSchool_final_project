import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { signin2Response } from './Signin2ResponseDm';

@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.css'],
})
export class Signin2Component implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  username: string = '';
  password: string = '';
  email!: string;
  role: any;


  onsubmitz() {

    console.log(this.username, this.email, this.password, this.role);
    this.authService
      .signup(this.username, this.email, this.password, this.role)
      .subscribe(
         (res: any)=> {
          this.authService
          .login(this.username, this.password)
          .subscribe((res: any) => {
            console.log('Accesso effettuato')
            localStorage.setItem('user', JSON.stringify(res))
            localStorage.setItem('token',JSON.stringify(res.accessToken))
            this.authService.setToken(res.accessToken)
            this.router.navigateByUrl('/clienti');
          });
        },

        (error) => {
          console.log('errore');
          console.error(error);
          alert('Utente già registrato o non risconosciuto');
        }
      );
  }

  ngOnInit(){}
}
