import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confermadialog',
  templateUrl: './confermadialog.component.html',
  styleUrls: ['./confermadialog.component.css']
})
export class ConfermadialogComponent {
  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<ConfermadialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
}
