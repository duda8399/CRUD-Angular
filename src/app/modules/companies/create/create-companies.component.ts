import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompaniesService } from 'src/app/services/companies/companies.service';

@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.scss']
})
export class CreateCompaniesComponent implements OnInit {

  form: FormGroup;
  count: number = -1;

  msg = null;
  type = null;

  constructor(
    private companiesService: CompaniesService,
    private router: Router,
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      social_name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      contacts: this.formBuilder.array([this.initActionFields()]),
    });
  }

  initActionFields(): FormGroup {
    this.count += 1;
    return this.formBuilder.group({
      name: new FormControl(null, []),
      last_name: new FormControl(null, []),
      phone: new FormControl(null, []),
      email: new FormControl(null, []),
    });
  }

  addNewInputField() {
    const control = <FormArray>this.form.controls.contacts;
    control.push(this.initActionFields());
  }

  removeInputField(index: number): void {
    this.count -= 1;
    const arrayControl = <FormArray>this.form.controls['contacts'];
    arrayControl.removeAt(index + 1);
  }

  checkValidTouched(field) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  applyCssError(field) {
    return {
      'has-error': this.checkValidTouched(field),
    };
  }

  create() {
    this.msg = null;
    this.type = null;

    if (this.form.status === 'VALID') {
      this.spinner.show();

      this.companiesService.create(this.form.value).subscribe(
        (data: any) => {
          this.msg = data.message;
          this.type = data.type;

          if (data.type != 'error') this.clearFields();
          this.spinner.hide();
        },
        (error) => {
          this.msg =
            'Ocorreu um erro inesperado. Favor tente novamente mais tarde.';
          this.type = 'error';
          this.spinner.hide();
        }
      );
    } else {
      this.msg = 'Existem campos obrigatórios que não foram preenchidos.';
      this.type = 'error';
      this.form.get('social_name').markAsTouched();
      this.form.get('cnpj').markAsTouched();
      this.form.get('address').markAsTouched();
      this.form.get('email').markAsTouched();
    }
  }

  clearFields() {
    this.form.get('social_name').setValue(null);
    this.form.get('cnpj').setValue(null);
    this.form.get('address').setValue('0');
    this.form.get('email').setValue(null);

    const arrayControl = <FormArray>this.form.controls['contacts'];
    this.clearFormArray(arrayControl);
    this.addNewInputField();

    this.form.get('social_name').markAsUntouched();
    this.form.get('cnpj').markAsUntouched();
    this.form.get('address').markAsUntouched();
    this.form.get('email').markAsUntouched();
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.controls.length !== 0) {
      formArray.removeAt(0)
    }
  }

}
