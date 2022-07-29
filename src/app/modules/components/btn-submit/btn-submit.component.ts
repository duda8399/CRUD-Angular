import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-submit',
  templateUrl: './btn-submit.component.html',
  styleUrls: ['./btn-submit.component.scss']
})
export class BtnSubmitComponent implements OnInit {

  @Input() label = 'SALVAR';

  constructor() { }

  ngOnInit(): void {
  }

}
