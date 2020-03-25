import { Injectable } from '@angular/core';
import { HttpBaseService } from '../_core/services/http-base.service';
import { Observable } from 'rxjs';
import { HttpResult } from '../_core/models/http-result';
import { catchError } from 'rxjs/operators';
import { Library } from './library';

@Injectable({
  providedIn: 'root'
})
export class LibraryService extends HttpBaseService {

  create(library: Library): Observable<HttpResult> {
    let headers = this.getHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const payload = new FormData();
    payload.append('name', library.name);
    payload.append('address', library.address);
    payload.append('phone', library.phone + '');
    payload.append('desc', library.desc);
    if (library.image) {
      payload.append('image', library.image, library.image.name);
    }
    payload.append('manager', library.manager);
    payload.append('manager_address', library.manager_address);
    payload.append('manager_phone', library.manager_phone + '');
    return this.http.post(`${this.apiUrl}libraries/create`, payload, { headers });

  }

  update(id: string, library: Library): Observable<HttpResult> {
    let headers = this.getHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const payload: FormData = new FormData();
    payload.append('name', library.name);
    payload.append('address', library.address);
    payload.append('phone', library.phone + '');
    payload.append('desc', library.desc);
    if (library.image) {
      payload.append('image', library.image, library.image.name);
    }
    payload.append('manager', library.manager);
    payload.append('manager_address', library.manager_address);
    payload.append('manager_phone', library.manager_phone + '');
    return this.http.post(`${this.apiUrl}libraries/${id}/update`, payload, { headers });
    // return this.http.post(`${this.uploadUrl}`, payload, { headers });
  }

  uploadFile(fileToUpload: File): Observable<HttpResult> {
    let headers = this.getHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const payload: FormData = new FormData();
    payload.append('name', 'test');
    payload.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.uploadUrl}`, payload, { headers });
  }

  listLibraries(): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}libraries`, { headers: this.getHeaders() });
  }

  deleteLibrary(id: string): Observable<HttpResult> {
    return this.http.delete(`${this.apiUrl}libraries/${id}/delete`, { headers: this.getHeaders() });
  }
}
