import { TabService } from './features/tab/tab.service';
// import { File } from './helpers/file';
import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Tab } from './features/tab/tab';
import { LoaderService } from './loader.service';
import { File } from './models/file';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService, TabService],
})
export class AppComponent {
  tabs: Observable<Array<Tab>>;

  constructor(
    public dialogService: DialogService,
    public tabService: TabService
  ) {
    this.tabs = tabService.tabs;
  }

  ngOnInit(): void {
    this.tabService.selectTab(0);
  }

  clickTab(tab: Tab, index: number): void {
    this.tabService.selectTab(index);
  }

  closeTab(index: number): void {
    this.tabService.closeTab(index);
  }

  // uploadFilev2(): void {
  //   this.googleDrive.uploadFileAPIv2();
  // }

  // uploadFilev3(): void {
  //   this.googleDrive.uploadFileAPIv3();
  // }

  // fillTemplate(document: File): void {
  //   this.googleDrive.fillTemplate(document);
  // }
}
