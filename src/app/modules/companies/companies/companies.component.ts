import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Empresas');
  }

  ngOnInit(): void {
  }

}
