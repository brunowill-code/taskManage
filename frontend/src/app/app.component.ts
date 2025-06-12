import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './Components/card/card.component';
import {MatButtonModule} from '@angular/material/button';
import { AddTodoComponent } from './Components/add-todo/add-todo.component';
import { FilterComponent } from './Components/filter/filter.component';
import { ManageToDosService } from './Services/manage-to-dos.service';


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


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent,MatButtonModule, AddTodoComponent, FilterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  {
  
  title = 'frontend';

  toDo: IToDo[] = []
  toDoFiltrado: IToDo[] = [];


  manageTodoService = inject(ManageToDosService);

  constructor(){
    this.manageTodoService.get().subscribe(toDo =>{
      this.toDo = toDo
      this.toDoFiltrado = this.toDo;
    })
  }

  // pega todas as tarefas do backend e atribui ao toDo e ao toDoFiltrado
  GetAll() {
  this.manageTodoService.get().subscribe(toDo => {
    this.toDo = toDo;
    this.toDoFiltrado = this.toDo ; // inicializa com tudo
  });
}
// filtra as tarefas pelo status, se o status for '', todofiltrado é igual a lista completa toDo, se não é feito o filtro
// toDoFiltrado é mandado para os cards, seja ele cmo
  FiltrarStatus(status: string) {
    console.log('no pai', status);
    if (status === '') {
      this.toDoFiltrado = this.toDo;
    } else {
      this.toDoFiltrado = this.toDo.filter(todo => todo.status === status);
    }
  }
  //esta função chama o service de atualizar o status da tarefa, e depois do sucesso modifica o status no front
  AtualizarStatus(event: { todo: IToDo; novoStatus: string }) {
  const { todo, novoStatus } = event;

  this.manageTodoService.patchStatus(todo.id, novoStatus).subscribe({
    next: (res) => {
      console.log('Status atualizado com sucesso!', res);
      todo.status = novoStatus;
    },
    error: (err) => {
      console.error('Erro ao atualizar status:', err);
    }
  });
}

  //esta função chama o service de deletar a tarefa, e depois do sucesso modifica a lista do front
  DeletarToDo(todo: IToDo){
    const toDoId = todo.id;
    console.log(toDoId);
    this.manageTodoService.deleteToDo(toDoId).subscribe({
      next: () => {
        console.log('Tarefa deletada com sucesso!');
        this.toDoFiltrado = this.toDoFiltrado.filter(t => t.id !== toDoId);

      },
      error: (err) => {
        console.error('Erro ao deletar tarefa:', err);
      }
    }) 
  }

  //esta função chama o service de adicionar uma nova tarefa, e depois do sucesso modifica a lista do front
  AdicionarToDo(addToDo : AddTodo ) {
    console.log('add no pai',addToDo);
    this.manageTodoService.AddToDo(addToDo).subscribe({
      next: (novaTarefa: IToDo) => {
        console.log('Tarefa adicionada com sucesso!');
        this.toDoFiltrado = [...this.toDoFiltrado, novaTarefa];
      },
      error: (err) => {
        console.error('Erro ao adicionar tarefa:', err);
      }
    })
  }
  
}


