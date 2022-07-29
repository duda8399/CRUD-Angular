import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Contact } from 'src/app/models/contact';
import { CompaniesService } from 'src/app/services/companies/companies.service';

@Component({
  selector: 'app-edit-companies',
  templateUrl: './edit-companies.component.html',
  styleUrls: ['./edit-companies.component.scss'],
})
export class EditCompaniesComponent implements OnInit {

  itemsDelete = [];
  count: number = -1;
  msg = null;
  type = null;

  public form: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    social_name: new FormControl(null, [Validators.required]),
    cnpj: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    contactsDelete: new FormControl([], []),
    contacts: this.formBuilder.array([]),
  });

  constructor(
    private companiesService: CompaniesService,
    private router: Router,
    public formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.activedRoute.params.subscribe((params) => {
      let id = params.id;
      let items: Contact[];

      this.companiesService.show(id).subscribe(
        (e: any) => {
          this.form.get('id').setValue(e.id);
          this.form.get('social_name').setValue(e.social_name);
          this.form.get('address').setValue(e.address);
          this.form.get('email').setValue(e.email);
          this.form.get('cnpj').setValue(e.cnpj);

          items = e.contacts;
          let control = <FormArray>this.form.controls['contacts'];

          items.forEach((item) => {
            this.count += 1;
            control.push(
              this.formBuilder.group({
                id: item.id,
                name: item.name,
                last_name: item.last_name,
                phone: item.phone,
                email: item.email,
              })
            );
          });
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.router.navigate(['/'], {
            queryParams: {
              msg: 'Ocorreu um erro inesperado. Favor tente novamente mais tarde.',
              type: 'error',
            },
          });
        }
      );
    });
  }

  initActionFields(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(null, []),
      name: new FormControl(null, []),
      last_name: new FormControl(null, []),
      phone: new FormControl(null, []),
      email: new FormControl(null, []),
    });
  }

  addNewInputField() {
    const control = <FormArray>this.form.controls.contacts;
    control.push(this.initActionFields());
    this.count += 1;
  }

  removeInputField(index: number): void {
    const arrayControl = <FormArray>this.form.controls['contacts'];
    this.itemsDelete.push(arrayControl.at(index).get('id').value);
    this.form.get('contactsDelete').setValue(this.itemsDelete);
    arrayControl.removeAt(index);
    this.count -= 1;
  }

  checkValidTouched(field) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  applyCssError(field) {
    return {
      'has-error': this.checkValidTouched(field),
    };
  }

  update() {
    this.msg = null;
    this.type = null;

    if (this.form.status === 'VALID') {
      this.spinner.show();

      this.companiesService.update(this.form.value).subscribe(
        (data: any) => {
          this.spinner.hide();
          this.router.navigate(['/'], {
            queryParams: { msg: data.message, type: data.type },
          });
        },
        (error) => {
          this.spinner.hide();
          this.router.navigate(['/'], {
            queryParams: {
              msg: 'Ocorreu um erro inesperado. Favor tente novamente mais tarde.',
              type: 'error',
            },
          });
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
}
