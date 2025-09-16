import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../services/interfaces/categories.interface';
import { Maintenance } from '../../../services/interfaces/maintenance.interface';
import { MaintenanceEvent } from '../../../services/interfaces/maintenance-events.interface';

function hasProperty<T extends object, K extends keyof T>(
  obj: T,
  prop: K,
): obj is T & Record<K, string> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() columns: { header: string; field: string }[] = [];
  @Input() data: Maintenance[] | Category[] | MaintenanceEvent[] = [];
  @Input() button_text? = 'Edit';
  @Output() sendId = new EventEmitter<string>();

  getFieldValue(row: Category | Maintenance | MaintenanceEvent, field: string) {
    if (hasProperty(row, field as keyof (Category | Maintenance | MaintenanceEvent))) {
      return row[field as keyof (Category | Maintenance | MaintenanceEvent)];
    }
    return '';
  }
}
