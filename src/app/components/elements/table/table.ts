import { Component, Input } from '@angular/core';
import { Category } from '../../../services/interfaces/categories.interface';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() columns: string[] = [];
  @Input() data: Category[] = [];
}
