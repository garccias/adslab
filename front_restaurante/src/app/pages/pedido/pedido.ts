// Dentro de src/app/pages/pedido/pedido.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ClienteService } from '../../services/cliente.service';
import { PratoService } from '../../services/prato.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class PedidoComponent implements OnInit {
  // Injetamos todos os services que precisamos
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private pratoService = inject(PratoService);
  private pedidoService = inject(PedidoService);

  clientes$ = this.clienteService.getClientes();
  pratos: any[] = [];
  pedidoForm: FormGroup;

  constructor() {
    // Inicializamos o formulário com a estrutura básica
    this.pedidoForm = this.fb.group({
      cliente_id: ['', Validators.required],
      pratos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Quando o componente carrega, buscamos os pratos
    this.pratoService.getAllPratos().subscribe(pratos => {
      this.pratos = pratos;
      // E criamos os controles do formulário para cada prato
      this.addPratoControls();
    });
  }

  // Atalho para acessar o FormArray de pratos no template
  get pratosFormArray() {
    return this.pedidoForm.get('pratos') as FormArray;
  }

  addPratoControls() {
    // Para cada prato vindo da API, criamos um campo de quantidade
    this.pratos.forEach(() => this.pratosFormArray.push(new FormControl(0)));
  }

  onSubmit() {
    if (this.pedidoForm.invalid) {
      return;
    }

    // Prepara os dados para enviar para a API
    const formValue = this.pedidoForm.getRawValue();
    const pedidoFinal = {
      cliente_id: formValue.cliente_id,
      pratos: this.pratos
        .map((prato, index) => ({
          id: prato.id,
          quantidade: formValue.pratos[index]
        }))
        .filter(prato => prato.quantidade > 0) // Envia apenas pratos com quantidade > 0
    };

    // Chama o service para criar o pedido
    this.pedidoService.createPedido(pedidoFinal).subscribe(() => {
      alert('Pedido criado com sucesso!');
      this.router.navigate(['/pratos']); // Volta para a página do cardápio
    });
  }
}