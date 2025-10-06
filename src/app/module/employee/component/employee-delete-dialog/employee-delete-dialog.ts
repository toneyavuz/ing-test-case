import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ing-employee-delete-dialog',
  standalone: false,
  templateUrl: './employee-delete-dialog.html',
  styleUrl: './employee-delete-dialog.scss'
})
export class EmployeeDeleteDialog {
  constructor(
    private ref: MatDialogRef<EmployeeDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {
  }

  get name() {
    return this.data?.name
  }

  proceed() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close(false);
  }
}
