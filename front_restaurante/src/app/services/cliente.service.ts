
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/clientes';


  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

 
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }


  createCliente(clienteData: { nome: string; cpf_cliente: string }): Observable<any> {
    return this.http.post(this.apiUrl, clienteData);
  }

  
  updateCliente(id: number, clienteData: { nome: string; cpf_cliente?: string }): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, clienteData);
}

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}