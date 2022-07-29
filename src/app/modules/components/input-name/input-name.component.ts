import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNameComponent),
      multi: true
    }
  ]
})
export class InputNameComponent implements ControlValueAccessor {

  @Input() label = 'Nome';
  @Input() placeholder = 'Digite o nome';
  @Input() classCss;
  @Input() control;
  @Input() disabled;
  @Input() required = false

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
