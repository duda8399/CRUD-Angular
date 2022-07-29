import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-msg-feedback',
  templateUrl: './msg-feedback.component.html',
  styleUrls: ['./msg-feedback.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MsgFeedbackComponent),
      multi: true,
    },
  ],
})
export class MsgFeedbackComponent implements ControlValueAccessor {
  @Input() msg;
  @Input() type;

  onChange: any = () => {};
  onTouch: any = () => {};
  val: any;

  get value() {
    return this.val;
  }

  set value(val) {
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
