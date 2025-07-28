// Dentro de src/app/pages/relatorios/relatorios.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioService } from '../../services/relatorio.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css'
})
export class RelatoriosComponent {
  private relatorioService = inject(RelatorioService);

  // Criamos uma variável para cada relatório que queremos exibir
  pratosMaisPedidos$ = this.relatorioService.getPratosMaisPedidos();
  topClientesPedidos$ = this.relatorioService.getTopClientesPorPedidos();
  topClientesGasto$ = this.relatorioService.getTopClientesPorGasto();
}
