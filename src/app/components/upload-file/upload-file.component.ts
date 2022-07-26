import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  file: File | null = null;
  constructor(private ref: DynamicDialogRef) {}

  ngOnInit(): void {}

  onBasicUpload(e: any): void {
    console.log('file upload', e);
  }

  onFileSelect(e: any): void {
    this.file = e.currentFiles[0];

    console.log(this.file);
  }

  execute(): void {
    if (this.file != null) {
      this.ref.close(this.file);
    }
  }
}
