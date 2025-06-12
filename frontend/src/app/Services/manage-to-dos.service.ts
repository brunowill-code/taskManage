import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface IToDo {
  id: number,
  title: string,
  description: string,
  deadline: string,
  status: string
}
interface AddTodo{
  title: string,
  description: string,
  deadline: string,
  status: string
}


@Injectable({
  providedIn: 'root'
})
export class ManageToDosService {

  private http  = inject (HttpClient);
  private apiURL = environment.apiURL ;

  //service para pegar todas as atividades do back
  public get(): Observable<any> {
    return this.http.get(this.apiURL + '/api/ToDo')
  }

  //service para pegar atualizar status
  public patchStatus(id: number, status: string): Observable<any> {
    const patchBody = [
      { op: 'replace', path: '/status', value: status }
    ];
    return this.http.patch(`${this.apiURL}/api/ToDo/${id}`, patchBody);
  }
  //service para deletar atividades
  public deleteToDo(id:number) : Observable<any> {
    return this.http.delete(`${this.apiURL}/api/ToDo/${id}`);
  }
  //service para adicionar atividades
  public AddToDo(toDo:AddTodo ): Observable<any> {
    const postBody = toDo;
    return this.http.post(`${this.apiURL}/api/ToDo/`, postBody);
  }

}
