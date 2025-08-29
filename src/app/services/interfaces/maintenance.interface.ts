export interface Maintenance {
  id: string;
  title: string;
  start_date: string;
  repetition_unit: repetition_unit;
  repetition_value: number;
  is_completed: boolean;
  notes: string;
  category_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

enum repetition_unit {
  'day',
  'week',
  'month',
  'year',
}
