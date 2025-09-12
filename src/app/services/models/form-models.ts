export interface CategoryForm {
  name: string;
}

export interface MaintenanceForm {
  title: string;
  start_date: string;
  repetition_unit: RepetitionUnit;
  repetition_value: number;
  is_completed: boolean;
  category_id: string;
  notes?: string;
}

enum RepetitionUnit {
  'day',
  'week',
  'month',
  'year',
}
