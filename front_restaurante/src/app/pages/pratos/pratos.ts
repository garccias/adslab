// Em: src/app/pages/pratos/pratos.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
// IMPORTANTE: Precisamos importar a interface 'Prato' para usá-la como tipo
import { Prato, PratoService } from '../../services/prato.service';

@Component({
  selector: 'app-pratos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pratos.component.html',
  styleUrl: './pratos.component.css'
})
export class PratosComponent {
  private pratoService = inject(PratoService);
  private refresh$ = new BehaviorSubject<void>(undefined);

  pratos$ = this.refresh$.pipe(
    switchMap(() => this.pratoService.getAllPratos())
  );

  pratoForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    descricao: new FormControl(''),
preco: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)])  });

  pratoIdSendoEditado: number | null = null;

  // CORREÇÃO 1: O parâmetro 'prato' deve ser do tipo 'Prato'
  onEdit(prato: Prato): void {
    this.pratoIdSendoEditado = prato.id;
    this.pratoForm.setValue({
      nome: prato.nome,
      descricao: prato.descricao || '',
      preco: prato.preco
    });
  }

  onCancelEdit(): void {
    this.pratoIdSendoEditado = null;
    this.pratoForm.reset();
  }

  onSubmit() {
    if (this.pratoForm.invalid) {
      return;
    }

    // CORREÇÃO 2: O tipo dos dados do prato também deve ser 'Prato'
    const pratoData = this.pratoForm.value as Omit<Prato, 'id'>;

    if (this.pratoIdSendoEditado) {
      this.pratoService.updatePrato(this.pratoIdSendoEditado, pratoData)
        .subscribe(() => this.finalizarAcao());
    } 
    else {
      this.pratoService.createPrato(pratoData)
        .subscribe(() => this.finalizarAcao());
    }
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar este prato?')) {
      this.pratoService.deletePrato(id).subscribe(() => {
        alert('Prato deletado com sucesso!');
        this.refresh$.next();
      });
    }
  }
  
  private finalizarAcao(): void {
    this.pratoIdSendoEditado = null;
    this.pratoForm.reset();
    this.refresh$.next();
  }
}