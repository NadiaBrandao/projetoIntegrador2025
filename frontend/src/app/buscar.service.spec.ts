import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config'; // Importa a URL da API

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  private apiUrl = `${API_URL}/api/buscar-local`; // URL do  backend

  constructor(private http: HttpClient) { }

  buscarLocal(query: string): Observable<any> {
    let params = new HttpParams().set('query', query); // Passa a query como parâmetro
    return this.http.get<any>(this.apiUrl, { params });
  }
}
