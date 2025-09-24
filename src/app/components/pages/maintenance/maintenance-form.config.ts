import { Validators } from '@angular/forms';
import { FormConfig } from '../../elements/add-form/config/form.types';

export const maintenanceViews = [
  { name: 'List', value: 'list' },
  { name: 'Calendar', value: 'calendar' },
];

export const repetitionUnitOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

export function getMaintenanceFormConfig(
  categoryOptions: { value: string; label: string }[],
): FormConfig[] {
  return [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      validators: [Validators.required, Validators.maxLength(255)],
    },
    {
      name: 'start_date',
      label: 'Start date',
      type: 'date',
      validators: [Validators.required],
    },
    {
      name: 'repetition_unit',
      label: 'Repeat unit',
      type: 'select',
      options: repetitionUnitOptions,
      validators: [Validators.required],
    },
    {
      name: 'repetition_value',
      label: 'Repeat value',
      type: 'number',
      validators: [Validators.required, Validators.min(1)],
    },
    {
      name: 'category_id',
      label: 'Category',
      type: 'select',
      options: categoryOptions,
      validators: [Validators.required],
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
    },
  ];
}
