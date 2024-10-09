import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Projeto } from '../models/projeto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/projeto";

  constructor() { }

  listAll(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.API + "/listAll");
  }

  save(projeto: Projeto): Observable<string> {
    return this.http.post<string>(this.API + "/save", projeto, { responseType: 'text' as 'json' });
  }

  update(projeto: Projeto): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + projeto.id, projeto, { responseType: 'text' as 'json' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/delete/" + id, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(this.API + "/findById/" + id);
  }

}
