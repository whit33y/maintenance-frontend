import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormConfig } from './config/form.types';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css',
})
export class AddForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  @Input() config!: FormConfig[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any;
  @Output() formSubmit = new EventEmitter<unknown>();

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
      this.formSubmit.emit(this.form.value);
    }
  }
}
