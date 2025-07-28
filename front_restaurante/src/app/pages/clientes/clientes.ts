// Em: src/app/pages/clientes/clientes.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente, ClienteService } from '../../services/cliente.service'; 
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class ClientesComponent {
  private clienteService = inject(ClienteService);
  private refresh$ = new BehaviorSubject<void>(undefined);

  clientes$ = this.refresh$.pipe(
    switchMap(() => this.clienteService.getClientes())
  );

  clienteForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf_cliente: new FormControl('', [Validators.required])
  });

  // Variável para guardar o ID do cliente que estamos editando
  clienteIdSendoEditado: number | null = null;

  // Método para carregar os dados no formulário para edição
  onEdit(cliente: Cliente): void {
    this.clienteIdSendoEditado = cliente.id;
    // Usamos patchValue para preencher apenas os campos que o formulário tem
    this.clienteForm.patchValue({
      nome: cliente.nome,
      cpf_cliente: cliente.cpf
    });
  }

  // Método para cancelar a edição
  onCancelEdit(): void {
    this.clienteIdSendoEditado = null;
    this.clienteForm.reset();
  }

  // Método onSubmit agora é mais inteligente
  onSubmit() {
    if (this.clienteForm.invalid) return;

    const dadosFormulario = this.clienteForm.getRawValue();
    const dadosLimpos = {
      ...dadosFormulario,
      cpf_cliente: dadosFormulario.cpf_cliente?.replace(/[^\d]/g, '')
    };

    // SE estamos editando...
    if (this.clienteIdSendoEditado) {
      this.clienteService.updateCliente(this.clienteIdSendoEditado, dadosLimpos as any)
        .subscribe(() => this.finalizarAcao('Cliente atualizado com sucesso!'));
    } 
    // SENÃO, estamos criando um novo.
    else {
      this.clienteService.createCliente(dadosLimpos as any)
        .subscribe(() => this.finalizarAcao('Cliente criado com sucesso!'));
    }
  }

  // Adicionamos a lógica de 'deletar' que já tínhamos feito
  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(() => {
        alert('Cliente deletado com sucesso!');
        this.refresh$.next();
      });
    }
  }

  // Função auxiliar para evitar repetição de código
  private finalizarAcao(mensagem: string): void {
    alert(mensagem);
    this.clienteIdSendoEditado = null;
    this.clienteForm.reset();
    this.refresh$.next();
  }
}