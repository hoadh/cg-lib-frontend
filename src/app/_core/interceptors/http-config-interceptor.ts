import { Injectable, Inject } from '@angular/core';
import { ACCESS_TOKEN } from '../tokens/access-token';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(@Inject(ACCESS_TOKEN) public accessToken) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem(this.accessToken);

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }));
  }

}
