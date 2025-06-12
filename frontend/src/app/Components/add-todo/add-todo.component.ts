import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {MatSelectModule} from '@angular/material/select';

interface Status{
  value: string;
  viewValue: string;
}

interface AddTodo{
  title: string,
  description: string,
  deadline: string,
  status: string
}

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule,MatSelectModule,CommonModule,MatButtonModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {

  @Output('addToDo') addEmitter = new EventEmitter<AddTodo>();
  
  //status da tarefa
  status: Status[] = [
    {value: 'Pendente', viewValue: 'Pendente'},
    {value: 'Em Andamento', viewValue: 'Em Andamento'},
    {value: 'Concluída', viewValue: 'Concluída'},
  ];
  //addToDo começa com valores vazios e vai sendo adicionado
  addToDo : AddTodo = {
    title: '',
    description: '',
    deadline: '',
    status: ''
  };
  //Emite para o pai a nova tarefa a ser adicionada
  AdicionarTarefa(){
    console.log(this.addToDo);
    this.addEmitter.emit(this.addToDo);
  }
}


