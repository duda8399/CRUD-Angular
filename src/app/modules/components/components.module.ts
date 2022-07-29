import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { BtnCancelComponent } from './btn-cancel/btn-cancel.component';
import { BtnSubmitComponent } from './btn-submit/btn-submit.component';
import { InputAddressComponent } from './input-address/input-address.component';
import { InputCnpjComponent } from './input-cnpj/input-cnpj.component';
import { InputEmailComponent } from './input-email/input-email.component';
import { InputNameComponent } from './input-name/input-name.component';
import { InputPhoneComponent } from './input-phone/input-phone.component';
import { InputSocialNameComponent } from './input-social-name/input-social-name.component';
import { MsgFeedbackComponent } from './msg-feedback/msg-feedback.component';



@NgModule({
  declarations: [
    BtnCancelComponent,
    BtnSubmitComponent,
    InputAddressComponent,
    InputCnpjComponent,
    InputEmailComponent,
    InputNameComponent,
    InputPhoneComponent,
    InputSocialNameComponent,
    MsgFeedbackComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    BtnCancelComponent,
    BtnSubmitComponent,
    InputAddressComponent,
    InputCnpjComponent,
    InputEmailComponent,
    InputNameComponent,
    InputPhoneComponent,
    InputSocialNameComponent,
    MsgFeedbackComponent
  ]
})
export class ComponentsModule { }
