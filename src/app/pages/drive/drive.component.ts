import { ActivatedRoute, Router, Params } from '@angular/router';
import { FolderMetadeta } from './../../models/folder-metadeta';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { CuFolderComponent } from 'src/app/components/cu-folder/cu-folder.component';
import { DriveService } from 'src/app/features/drive/drive.service';
import { TabService } from 'src/app/features/tab/tab.service';
import { File } from '../../models/file';
import { Tab } from 'src/app/features/tab/tab';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss'],
})
export class DriveComponent implements OnInit {
  files: Observable<Array<File>>;
  items: Observable<MenuItem[]>;

  constructor(
    private readonly driveService: DriveService,
    private readonly tabService: TabService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.files = this.driveService.files;
    this.items = driveService.breadcrumbItems;
  }

  ngOnInit(): void {
    this.driveService.getFilesByFolder(
      this.activatedRoute.snapshot.queryParams
    );
    this.activatedRoute.queryParams.subscribe((res: Params) => {
      this.driveService.getFilesByFolder(res);
    });
  }

  openFile(file: File): void {
    this.driveService.openFile(file, this.tabService);
  }

  showCreateFolderView(): void {
    const createFolderView = this.dialogService.open(CuFolderComponent, {
      header: 'Додати нову папку',
      width: '400px',
      data: {
        currentFolderId: this.driveService.lastFolderId,
      },
    });

    createFolderView.onClose.subscribe((folderMetadeta: FolderMetadeta) => {
      this.driveService.createFolder(folderMetadeta);
    });
  }

  showUploadFileView(): void {}
}
