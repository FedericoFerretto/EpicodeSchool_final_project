import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(
  private authService : AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq: HttpRequest<any> = request.clone({
      headers: request.headers
        .set(
          'Authorization',
          'Bearer ' + this.authService.accessToken
        )

        .set('X-TENANT-ID', 'fe_0122a'),
    });
    return next.handle(authReq);
  }
}
