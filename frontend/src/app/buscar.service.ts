import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  private apiUrl = 'http://localhost:3000/api/buscar-local'; 

  constructor(private http: HttpClient) {}

  buscarLocal(filtros: any): Observable<any> {
    console.log('📡 Enviando requisição para:', this.apiUrl, 'com filtros:', filtros);
    return this.http.post<any>(this.apiUrl, filtros);
}
}

