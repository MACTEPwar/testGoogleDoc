import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cu-folder',
  templateUrl: './cu-folder.component.html',
  styleUrls: ['./cu-folder.component.scss'],
})
export class CuFolderComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    parentId: new FormControl(null),
  });

  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.profileForm
      .get('parentId')
      ?.setValue(this.config.data.currentFolderId);
  }

  ngOnInit(): void {}

  execute(): void {
    if (this.profileForm.valid) {
      this.ref.close(this.profileForm.getRawValue());
    }
  }
}
