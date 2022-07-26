import { FileModule } from './features/file/file.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DocumentComponent } from './pages/document/document.component';
import { SafePipe } from './pipes/safe.pipe';
import { TabModule } from './features/tab/tab.module';
import { DriveComponent } from './pages/drive/drive.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DriveModule } from './features/drive/drive.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { GoogleDriveService } from './google-drive.service';
import { CuFolderComponent } from './components/cu-folder/cu-folder.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconByMimeTypePipe } from './pipes/icon-by-mime-type.pipe';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    SafePipe,
    DriveComponent,
    TemplatesComponent,
    CuFolderComponent,
    UploadFileComponent,
    IconByMimeTypePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // SocialLoginModule,
    OAuthModule.forRoot(),
    ButtonModule,
    DynamicDialogModule,
    TabModule,
    BreadcrumbModule,
    DriveModule,
    OverlayPanelModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    FileModule,
    FileUploadModule,
  ],
  providers: [
    GoogleDriveService,
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: true, //keeps the user signed in
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '738387477576-k80tvb20ts5d3pbnr0poe710ssj85gev.apps.googleusercontent.com'
    //         ), // your client id
    //       },
    //     ],
    //   },
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
