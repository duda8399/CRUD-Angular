import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  URL: string;

  constructor() {
    this.URL = 'https://desafio-br24-api.herokuapp.com/api/';
    //this.URL = 'http://localhost:8000/api/';
  }
}
