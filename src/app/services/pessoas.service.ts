import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/pessoa";

  constructor() { }

  listAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API + "/listAll");
  }

  save(pessoa: Pessoa): Observable<string> {
    return this.http.post<string>(this.API + "/save", pessoa, { responseType: 'text' as 'json' });
  }

  update(pessoa: Pessoa): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + pessoa.id, pessoa, { responseType: 'text' as 'json' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.API + "/findById/" + id);
  }
}
