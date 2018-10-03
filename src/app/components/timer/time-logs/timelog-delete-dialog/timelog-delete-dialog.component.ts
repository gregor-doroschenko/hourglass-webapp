import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-timelog-delete-dialog',
  templateUrl: './timelog-delete-dialog.component.html',
  styleUrls: ['./timelog-delete-dialog.component.scss']
})
export class TimelogDeleteDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<TimelogDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() { }

  delete() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }

}
