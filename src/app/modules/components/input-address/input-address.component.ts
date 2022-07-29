import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAddressComponent),
      multi: true
    }
  ]
})
export class InputAddressComponent implements ControlValueAccessor {

  @Input() label = 'Endereço';
  @Input() placeholder = 'Digite o endereço';
  @Input() control;
  @Input() classCss;
  @Input() disabled = false;

  onChange: any = () => {};
  onTouch: any = () => {};
  val: any;

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
