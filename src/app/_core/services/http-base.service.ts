import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { ACCESS_TOKEN } from '../tokens/access-token';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {
  protected apiUrl = environment.apiUrl;
  protected uploadUrl = environment.uploadUrl;
  constructor(
    public http: HttpClient,
    @Inject(ACCESS_TOKEN) public accessToken
  ) { }

  public static log(message: string) {
    console.log(message);
    console.log(JSON.stringify(message));
  }

  public static handleResult<T>(result?: T) {
    return result;
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      const message = `${operation} failed: ${error}`;
      HttpBaseService.log(message);

      return of(result as T);
    };
  }

  public getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.accessToken);
    let headers = new HttpHeaders();
    // console.log('token', token);
    headers = headers.append('Authorization', 'Bearer ' + token);
    // console.log('headers:Authorization', headers.get('Authorization'));
    return headers;
  }
}
