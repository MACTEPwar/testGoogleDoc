import { switchMap } from 'rxjs/operators';
import { FileService } from './../../features/file/file.service';
import { UploadFileComponent } from './../../components/upload-file/upload-file.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FolderMetadeta } from './../../models/folder-metadeta';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { CuFolderComponent } from 'src/app/components/cu-folder/cu-folder.component';
import { DriveService } from 'src/app/features/drive/drive.service';
import { TabService } from 'src/app/features/tab/tab.service';
import { File as MyFile } from '../../models/file';
import { Tab } from 'src/app/features/tab/tab';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss'],
})
export class DriveComponent implements OnInit {
  files: Observable<Array<MyFile>>;
  items: Observable<MenuItem[]>;
  tabId: string = '';

  constructor(
    private readonly driveService: DriveService,
    private readonly tabService: TabService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fileService: FileService
  ) {
    this.files = this.driveService.files;
    this.items = driveService.breadcrumbItems;
  }

  ngOnInit(): void {
    this.tabId = this.activatedRoute.snapshot.queryParams.id as string;
    this.driveService.getFilesByFolder(
      this.activatedRoute.snapshot.queryParams
    );
    this.activatedRoute.queryParams.subscribe((res: Params) => {
      this.driveService.getFilesByFolder(res);
    });
  }

  openFile(file: MyFile): void {
    this.driveService.openFile(file, this.tabService, this.tabId);
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

  showUploadFileView(): void {
    const uploadFileView = this.dialogService.open(UploadFileComponent, {
      header: 'Завантажити файл',
      width: '400px',
    });

    uploadFileView.onClose
      .pipe(
        switchMap((file: File) => {
          return this.fileService.uploadFile$(
            file,
            this.driveService.lastFolderId
          );
        })
      )
      .subscribe((uploadfileMetadata: any) => {
        this.driveService.getFilesByFolder(
          this.activatedRoute.snapshot.queryParams
        );
      });
  }

  func(e: any): void {
    this.driveService.changeBreadcrumbs(
      e.item.queryParams.path,
      this.tabService
    );
  }
}
