import { Validators } from '@angular/forms';
import { FormConfig } from '../../elements/add-form/config/form.types';

export const categoriesForm: FormConfig[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validators: [Validators.required, Validators.maxLength(255)],
  },
];
