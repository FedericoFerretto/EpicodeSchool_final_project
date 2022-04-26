import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { login2Response } from './Login2ResponseDm';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
})
export class Login2Component implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  username: string = '';
  password: string = '';

  onsubmit() {
    console.log(this.username, this.password);
    this.authService
      .login(this.username, this.password)
      .subscribe((res: any) => {
        console.log('Accesso effettuato')
        localStorage.setItem('user', JSON.stringify(res))
        localStorage.setItem('token',JSON.stringify(res.accessToken))
        this.authService.setToken(res.accessToken)
        this.router.navigateByUrl('/lista-utenti');
      });
  }

  ngOnInit(): void {}
}
