export interface MaintenanceEvent {
  id: string;
  maintenance_id: string;
  completion_date: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  notes?: string;
}
