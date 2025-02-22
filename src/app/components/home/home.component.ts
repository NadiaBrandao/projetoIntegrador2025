import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from "../formulario/formulario.component";
import { Busca1Component } from "../../busca1/busca1.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,
    NgOptimizedImage, ReactiveFormsModule, FormularioComponent, Busca1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
