//import { Component } from '@angular/core';
//import { ReactiveFormsModule } from '@angular/forms';

//@Component({
  //selector: 'app-formulario',
  //standalone: true,
  //imports: [ReactiveFormsModule],
  //templateUrl: './formulario.component.html',
  //styleUrl: './formulario.component.scss'
//})
//export class FormularioComponent {

//} 

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { API_URL } from '../../../config';

@Component({
    selector: 'app-formulario',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
    cadastroForm: FormGroup;
    mensagemSucesso: string = ''; // ✅ Variável para armazenar a mensagem

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.cadastroForm = this.fb.group({
            name: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            gender: ['', Validators.required],
            birthDate: ['', Validators.required],
            age: ['', [Validators.required, Validators.min(1)]],
        });
    }

    onSubmit() {
        if (this.cadastroForm.valid) {
            this.http.post(`${API_URL}/usuarios`, this.cadastroForm.value)
                .subscribe(
                    response => {
                        console.log('✅ Usuário cadastrado com sucesso:', response);

                        // ✅ Exibir mensagem de sucesso
                        this.mensagemSucesso = 'Usuário cadastrado com sucesso!';

                        // ✅ Limpar o formulário
                        this.cadastroForm.reset();

                        // ✅ Remover a mensagem após 5 segundos
                        setTimeout(() => this.mensagemSucesso = '', 5000);
                    },
                    error => {
                        console.error('❌ Erro ao cadastrar usuário:', error);
                    }
                );
        } else {
            console.warn('⚠️ Formulário inválido!');
        }
    }
}


