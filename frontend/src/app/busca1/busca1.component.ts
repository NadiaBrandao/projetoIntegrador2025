import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BuscarService } from '../buscar.service';
import { HttpClientModule } from '@angular/common/http'; // ✅ Importando HttpClientModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busca1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // ✅ Adicionando HttpClientModule
  templateUrl: './busca1.component.html',
  styleUrls: ['./busca1.component.scss'],
  providers: [BuscarService]
})
export class Busca1Component {
  buscaForm: FormGroup;
  resultados: any[] = [];

  constructor(private buscarService: BuscarService, private fb: FormBuilder) {
    this.buscaForm = this.fb.group({
      serviceType: [''],
      state: [''],
      city: [''],
      neighborhood: [''],
      rating: ['']
    });
  }

  onBuscar() {
    console.log('🔍 Botão buscar foi clicado!');

    const filtros = this.buscaForm.value;
    
    this.buscarService.buscarLocal(filtros).subscribe(
      (response) => {
        console.log('✅ Resposta do servidor:', response);
        this.resultados = response.results; 
      },
      (error) => {
        console.error('❌ Erro na busca:', error);
      }
    );
}

}

