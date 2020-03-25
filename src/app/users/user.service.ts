import { HttpResult } from '../_core/models/http-result';
import { HttpBaseService } from '../_core/services/http-base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpBaseService {

  addUser(user: User): Observable<HttpResult> {
    return this.http.post(`${this.apiUrl}librarians/create`, user, { headers: this.getHeaders() })
      .pipe(
        map(result => {
          return result;
        },
          catchError((error) => {
            this.handleError('addUser', null);
            return error;
          })
        )
      );
  }

  listUsers(): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}librarians`, { headers: this.getHeaders() });
  }

  deleteUser(id: string): Observable<HttpResult> {
    return this.http.delete(`${this.apiUrl}librarians/${id}/delete`, { headers: this.getHeaders() });
  }

  updateUser(id: string, user: User): Observable<HttpResult> {
    return this.http.post(`${this.apiUrl}librarians/${id}/update`, user, { headers: this.getHeaders() });
  }
}
