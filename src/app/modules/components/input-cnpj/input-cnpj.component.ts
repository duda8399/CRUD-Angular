import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-cnpj',
  templateUrl: './input-cnpj.component.html',
  styleUrls: ['./input-cnpj.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCnpjComponent),
      multi: true
    }
  ]
})
export class InputCnpjComponent implements ControlValueAccessor {

  @Input() label = 'CNPJ';
  @Input() placeholder = 'Digite o CNPJ';
  @Input() classCss;
  @Input() control;
  @Input() disabled = false;

  onChange: any = () => {};
  onTouch: any = () => {};
  val: any;

  constructor() {
  }

  get value () {
    return this.val;
  }

  set value (val) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

}
