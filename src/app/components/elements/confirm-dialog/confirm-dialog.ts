import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  @Input() description = '';
  @Output() cancelDialog = new EventEmitter();
  @Output() confirmDialog = new EventEmitter();
}
