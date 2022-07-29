import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-index-companies',
  templateUrl: './index-companies.component.html',
  styleUrls: ['./index-companies.component.scss'],
})
export class IndexCompaniesComponent implements OnInit {
  type: string = null;
  msg: string = null;

  dtOptions: any;
  companies: any;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  deleteModalRef: BsModalRef;
  id: number;
  @ViewChild('deleteModal') deleteModal;

  constructor(
    private companiesService: CompaniesService,
    private bsModalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {
    this.spinner.show();

    this.dtOptions = {
      pagingType: 'simple_numbers',
      responsive: true,
      scrollX: true,
      lengthMenu: [
        [20, 50, 100, -1],
        ['20 linhas', '50 linhas', '100 linhas', 'Mostrar Todas'],
      ],
      dom:
        "<'row'<'col-12'<'float-right mb-3'B>>>" +
        "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
      buttons: [
        {
          extend: 'excel',
          text: '<i class="far fa-file-excel mr-2"></i>Excel',
          className: 'btn-sm btn-secondary',
          exportOptions: {
            columns: [0, 2, 3, 4],
          },
        },
        {
          extend: 'print',
          text: '<i class="fas fa-print mr-2"></i>Imprimir',
          className: 'btn-sm btn-secondary',
          exportOptions: {
            columns: [0, 2, 3, 4],
          },
        },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json',
      },
    };

    this.activatedRoute.queryParams.subscribe((params) => {
      this.msg = params.msg;
      this.type = params.type;
    });
  }

  ngAfterViewInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companiesService.getCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;
        this.rerender();
        this.spinner.hide();
      },
      (erro) => {
        this.rerender();
        this.spinner.hide();
        this.msg =
          'Ocorreu um erro inesperado. Favor tente novamente mais tarde.';
        this.type = 'error';
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(id: number) {
    this.id = id;
    this.deleteModalRef = this.bsModalService.show(this.deleteModal);
  }

  onClose() {
    this.deleteModalRef.hide();
  }

  onConfirm() {
    this.companiesService.delete(this.id)
      .subscribe(
        async (data: any) => { 
          this.msg = data.message;
          this.type = data.type;
          
          this.onClose();
          this.getCompanies();
        },
        error => { console.log('error ', error); },
        () => {}
      )
  }

  rerender(): void {
    if(this.dtElement.dtInstance != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }
}
