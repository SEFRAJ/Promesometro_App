import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { routing, appRoutingProviders} from "./app.routing";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { CandidatosComponent } from './components/candidatos/candidatos.component';
import { PromesasComponent } from './components/promesas/promesas.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PartidosComponent,
    CandidatosComponent,
    PromesasComponent,
    RegistroComponent,
    CreditosComponent,
    EncabezadoComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClarityModule,
    routing,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
