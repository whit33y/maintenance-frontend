import { ValidatorFn } from '@angular/forms';

export interface FormConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea' | 'checkbox' | 'select';
  validators?: ValidatorFn[];
  options?: FormOption[];
}

export interface FormOption {
  value: string;
  label: string;
}
