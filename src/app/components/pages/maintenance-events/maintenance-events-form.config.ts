import { Validators } from '@angular/forms';
import { FormConfig } from '../../elements/add-form/config/form.types';

export const maintenanceForm: FormConfig[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    validators: [Validators.required, Validators.maxLength(255)],
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'textarea',
  },
];
