import { HttpBaseService } from 'src/app/_core/services/http-base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResult } from '../_core/models/http-result';

@Injectable({
  providedIn: 'root'
})
export class StatsService extends HttpBaseService {
  public listBorrowReturnCounting(libraryId: number, categoryId: number, startDate: string, endDate: string): Observable<HttpResult> {
    const params = `library_id=${libraryId}&category_id=${categoryId}&start_date=${startDate}&end_date=${endDate}`;
    return this.http.get(`${this.apiUrl}stats/borrow-return?${params}`, { headers: this.getHeaders() });
  }
}
