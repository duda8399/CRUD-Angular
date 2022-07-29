import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-phone',
  templateUrl: './input-phone.component.html',
  styleUrls: ['./input-phone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPhoneComponent),
      multi: true
    }
  ]
})
export class InputPhoneComponent implements ControlValueAccessor {

  @Input() label = 'Telefone';
  @Input() placeholder = 'Digite o telefone';
  @Input() classCss;
  @Input() control;
  @Input() disabled;

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
