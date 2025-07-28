import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/pedidos';

  createPedido(pedidoData: any) {
    return this.http.post(this.apiUrl, pedidoData);
  }

  deletePedido(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}
