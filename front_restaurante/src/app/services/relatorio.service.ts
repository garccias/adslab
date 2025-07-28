import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/relatorios';

  getPratosMaisPedidos() {
    return this.http.get<any[]>(`${this.apiUrl}/pratos-mais-pedidos`);
  }

  getTopClientesPorPedidos() {
    return this.http.get<any[]>(`${this.apiUrl}/top-clientes-pedidos`);
  }

  getTopClientesPorGasto() {
    return this.http.get<any[]>(`${this.apiUrl}/top-clientes-gasto`);
  }
}