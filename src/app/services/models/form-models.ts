import { repetition_unit } from '../interfaces/maintenance.interface';

export interface CategoryForm {
  name: string;
}

export interface MaintenanceForm {
  title: string;
  start_date: string;
  repetition_unit: repetition_unit;
  repetition_value: number;
  is_completed: boolean;
  category_id: string;
  notes?: string;
}
