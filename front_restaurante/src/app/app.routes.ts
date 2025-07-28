
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ClientesComponent } from './pages/clientes/clientes';
import { PratosComponent } from './pages/pratos/pratos';
import { PedidoComponent } from './pages/pedido/pedido';
import { RelatoriosComponent } from './pages/relatorios/relatorios';

export const routes: Routes = [
    { path: 'clientes', component: ClientesComponent },
    { path: '', component: HomeComponent },
    { path: 'pratos', component: PratosComponent },
    { path: 'pedidos', component: PedidoComponent },
    { path: 'relatorios', component: RelatoriosComponent },
    { path: '', redirectTo: '/pratos', pathMatch: 'full' }
];