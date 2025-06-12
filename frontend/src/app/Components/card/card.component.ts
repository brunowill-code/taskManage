import { Component , Input, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Status{
  value: string;
  viewValue: string;
}

interface IToDo {
  id: number,
  title: string,
  description: string,
  deadline: string,
  status: string
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatIconModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  
  status: Status[] = [
      {value: 'Pendente', viewValue: 'Pendente'},
      {value: 'Em andamento', viewValue: 'Em Andamento'},
      {value: 'Concluído', viewValue: 'Concluído'},
    ];

    updateStatus : string = '';

  //requer um input das tarefas toDoFiltrado
  @Input({required: true, alias: 'Tarefas'}) tarefas!: IToDo;

  //output de atualizar o status
  @Output('atualizarToDo') statusAtualizadoEmitter = new EventEmitter<{ todo: IToDo; novoStatus: string }>();

  //output de deletar
  @Output('deletar') deletarEmitter = new EventEmitter<IToDo>()

  //emite para o componente para ser apagado
  deletarTarefa(todo: IToDo){
    this.deletarEmitter.emit(todo);
  }

  //emite para o componente para ser atualizado
  atualizarStatus(todo: IToDo) {
    this.statusAtualizadoEmitter.emit({ todo: todo, novoStatus: this.updateStatus });
  }

}
