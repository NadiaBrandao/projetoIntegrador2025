import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import axios from 'axios';
import { API_URL } from '../config';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PISisRecomendacao';
}

const api = axios.create({
  baseURL: API_URL
})

function app(){
  api.get('/usuarios').then((response)=> {
    console.log(response.data)
  })
}
