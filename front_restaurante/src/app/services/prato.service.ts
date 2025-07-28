// Em: src/app/services/prato.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Definindo uma interface para o tipo 'Prato' para deixar nosso código mais seguro e legível
export interface Prato {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class PratoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/pratos';

 
  getAllPratos(): Observable<Prato[]> {
    return this.http.get<Prato[]>(this.apiUrl);
  }

  getPratoById(id: number): Observable<Prato> {
    return this.http.get<Prato>(`${this.apiUrl}/${id}`);
  }

  createPrato(pratoData: Omit<Prato, 'id'>): Observable<any> {
    return this.http.post(this.apiUrl, pratoData);
  }

  
  updatePrato(id: number, pratoData: Partial<Omit<Prato, 'id'>>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pratoData);
  }

  deletePrato(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  UpdatePrato(id: number, pratoData: Partial<Omit<Prato, 'id'>>) {
  return this.http.put(`${this.apiUrl}/${id}`, pratoData);
}
}