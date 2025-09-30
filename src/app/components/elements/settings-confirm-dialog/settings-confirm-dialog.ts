import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-confirm-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './settings-confirm-dialog.html',
  styleUrl: './settings-confirm-dialog.css',
})
export class SettingsConfirmDialog {
  @Input() deleteError = '';
  deleteForm = new FormGroup({
    password: new FormControl('', Validators.required),
  });
  @Output() deleteUser = new EventEmitter<string>();
  @Output() cancelDialog = new EventEmitter();
}
