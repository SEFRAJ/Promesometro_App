import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { CandidatosComponent } from './components/candidatos/candidatos.component';
import { PromesasComponent } from './components/promesas/promesas.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';


const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'partidos', component: PartidosComponent},
    {path: 'candidatos', component: CandidatosComponent},
    {path: 'promesas', component: PromesasComponent},
    {path: 'registro', component: RegistroComponent}, 
    {path: 'creditos', component: CreditosComponent}, 
    {path: 'encabezado', component: EncabezadoComponent}, 
    {path: '**', component: LoginComponent},
    
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)