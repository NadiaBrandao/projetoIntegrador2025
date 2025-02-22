import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  private apiUrl = 'http://localhost:3000/api/buscar-local'; // URL do seu backend

  constructor(private http: HttpClient) { }

  buscarLocal(query: string): Observable<any> {
    let params = new HttpParams().set('query', query); // Passa a query como parâmetro
    return this.http.get<any>(this.apiUrl, { params });
  }
}
