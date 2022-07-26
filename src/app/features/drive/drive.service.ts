import { BehaviorSubject, generate } from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { File as MyFile } from '../../models/file';
import { GoogleDriveService } from 'src/app/google-drive.service';
import { GoogleFiles } from 'src/app/models/fromGoogleApi/google-files';
import { FolderMetadeta } from 'src/app/models/folder-metadeta';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TabService } from 'src/app/features/tab/tab.service';
import { File } from '../../models/file';
import { Tab } from '../tab/tab';

@Injectable()
export class DriveService {
  breadcrumbItems: BehaviorSubject<Array<MenuItem>> = new BehaviorSubject<
    Array<MenuItem>
  >([]);
  files: BehaviorSubject<Array<MyFile>> = new BehaviorSubject<Array<MyFile>>(
    []
  );

  //metadata
  lastFolderId: string | null = null;

  constructor(
    private googleDriveService: GoogleDriveService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  openFile(file: File, tabService: TabService, tabId: string): void {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      const newPath = `${this.activatedRoute.snapshot.queryParams.path}/${file.id}`;
      let currentTab = tabService.tabs
        .getValue()
        .find((f) => f.id === this.activatedRoute.snapshot.queryParams.id);
      currentTab = currentTab?.changeQueryParams({
        path: newPath,
      });

      this.breadcrumbItems.next([
        ...this.breadcrumbItems.getValue(),
        {
          label: file.title,
          routerLink: '/drive',
          queryParams: {
            path: newPath,
            id: tabId,
          },
        },
      ]);

      this.router.navigate(['drive'], {
        queryParams: {
          id: this.activatedRoute.snapshot.queryParams.id,
          path: newPath,
        },
      });
    } else if (file.mimeType === 'application/vnd.google-apps.document') {
      tabService.openTab(new Tab(['document', file.id], file.title));
    } else {
      alert('Даний формат на пiдтримується');
    }
  }

  getFilesByFolder(route: Params): void {
    const pathList = (route.path as string).split('/');

    // this.generateBreadcrumbs(pathList);

    let currentFolderId: string | null = pathList[pathList.length - 1];
    currentFolderId = currentFolderId === 'root' ? null : currentFolderId;

    this.lastFolderId = currentFolderId;

    // alert(this.lastFolderId)

    this.googleDriveService
      .getFilesByFolder$(currentFolderId)
      .subscribe((incomingResponseFiles: GoogleFiles) => {
        this.files.next(incomingResponseFiles.items as Array<MyFile>);
      });
  }

  createFolder(folderMetadata: FolderMetadeta): void {
    this.googleDriveService.createFolder$(folderMetadata).subscribe((res) => {
      // ! Проверить
      this.getFilesByFolder(this.activatedRoute.snapshot.queryParams);
    });
  }

  private generateBreadcrumbs(idList: Array<string>): void {}

  changeBreadcrumbs(
    path: string,
    tabService: TabService
  ): void {
    let currentTab = tabService.tabs
      .getValue()
      .find((f) => f.id === this.activatedRoute.snapshot.queryParams.id);
    currentTab = currentTab?.changeQueryParams({
      path,
    });

    const currentBreadcrumbs = this.breadcrumbItems.getValue();
    let flag = false;
    const temp: MenuItem[] = [];
    currentBreadcrumbs.forEach((f) => {
      if (path === 'root') {
        flag = true;
      }
      if (flag === false) {
        temp.push(f as MenuItem);
      }
      flag = f.queryParams?.path === path;
    });
    this.breadcrumbItems.next(temp);
  }
}
