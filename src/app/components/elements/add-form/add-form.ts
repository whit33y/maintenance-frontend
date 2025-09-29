import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormConfig } from './config/form.types';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css',
})
export class AddForm<T extends object> implements OnInit {
  private formBuilder = inject(FormBuilder);
  @Input() config!: FormConfig[];
  @Input() data?: maintenanceEventFormData | categoryEventFormData;
  @Output() formSubmit = new EventEmitter<T>();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  private createFormGroup(): FormGroup {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const group: any = {};
    this.config.forEach(control => {
      group[control.name] = [this.data ? this.data[control.name] : '', control.validators];
    });
    return this.formBuilder.group(group);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as T);
    }
  }
}

export interface maintenanceEventFormData {
  title?: string;
  notes?: string;
  [key: string]: string | undefined;
}

export interface categoryEventFormData {
  name: string;
  [key: string]: string | undefined;
}
