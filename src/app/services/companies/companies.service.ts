import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EnvService } from '../env/env.service';
import { Company } from 'src/app/models/company';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private envService: EnvService) {}

  public getCompanies(): Observable<Company[]> {
    return this.http
      .get<Company[]>(this.envService.URL + 'companies', this.httpOptions)
      .pipe((data) => data);
  }

  public show(id: number): Observable<Company> {
    return this.http.get<Company>(
      this.envService.URL + 'companies/' + id + '/edit',
      this.httpOptions
    );
  }

  public create(company: Company): Observable<number> {
    return this.http
      .post(
        this.envService.URL + 'companies',
        JSON.stringify(company),
        this.httpOptions
      )
      .pipe(map((data: any) => data));
  }

  public update(company: Company): Observable<number> {
    console.log('uppdate ', JSON.stringify(company));
    return this.http
      .put(
        this.envService.URL + 'companies/' + company.id,
        JSON.stringify(company),
        this.httpOptions
      )
      .pipe(map((data: any) => data));
  }

  public delete(id: number) {
    return this.http
      .delete(this.envService.URL + 'companies/' + id, this.httpOptions)
      .pipe(map((data: any) => data));
  }
}
