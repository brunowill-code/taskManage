import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Status{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule,FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() statusSelecionado = new EventEmitter<string>();

  status: Status[] = [
    {value: '', viewValue: 'Todas Atividades'},
    {value: 'Pendente', viewValue: 'Pendente'},
    {value: 'Em andamento', viewValue: 'Em Andamento'},
    {value: 'Concluído', viewValue: 'Concluído'},
  ];

  statusFiltered : string = ''; 

  // emite para o componente pai o status selecionado, para aplicar o filtro
  filtrar() {
    console.log('filtrar por', this.statusFiltered);
    this.statusSelecionado.emit(this.statusFiltered);
  }
}
