import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  URL: string;

  constructor() {
    this.URL = 'http://desafio-br24-api.herokuapp.com/api/';
  }
}