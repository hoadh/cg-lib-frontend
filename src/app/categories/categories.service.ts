import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/_core/services/http-base.service';
import { Observable } from 'rxjs';
import { HttpResult } from 'src/app/_core/models/http-result';

@Injectable()
export class CategoriesService extends HttpBaseService {

  public add(category: any): Observable<HttpResult> {
    return this.http.post(`${this.apiUrl}categories`, category, { headers: this.getHeaders() });
  }

  public getList(): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}categories`, { headers: this.getHeaders() });
  }

  public update(categoryId: string, category: any): Observable<HttpResult> {
    return this.http.put(`${this.apiUrl}categories/${categoryId}`, category, { headers: this.getHeaders() });
  }

  public delete(categoryId: string): Observable<HttpResult> {
    return this.http.delete(`${this.apiUrl}categories/${categoryId}`, { headers: this.getHeaders() });
  }

}
