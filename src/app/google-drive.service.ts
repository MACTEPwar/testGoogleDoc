import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { FolderMetadeta } from './models/folder-metadeta';
import { GoogleFiles } from './models/fromGoogleApi/google-files';

@Injectable()
export class GoogleDriveService {
  constructor(private readonly http: HttpClient) {}

  getFilesByFolder$(folderId: string | null = null): Observable<GoogleFiles> {
    let apiUrl = `${environment.apiUrl}/folder`;
    if (folderId !== null) {
      apiUrl += `/${folderId}`;
    }
    return this.http.get(apiUrl);
  }

  createFolder$(folderMetadata: FolderMetadeta): Observable<any> {
    const apiUrl = `${environment.apiUrl}/folder`;
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.post(apiUrl, folderMetadata, { headers }).pipe(take(1));
  }

  //GET https://www.googleapis.com/drive/v3/files
  // getListFiles(): void {
  //   let queryParams = new HttpParams().set(
  //     'fields',
  //     'files(id, name, parents)'
  //   );
  //   queryParams = queryParams.append(
  //     'q',
  //     `'1hPfQ7gNv6NSvPgt1cjgL4iI2tf6qMYq-' in parents and (mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document' or mimeType='application/vnd.google-apps.document')`
  //   );

  //   this.http
  //     .get<GoogleFiles>(`https://www.googleapis.com/drive/v3/files`, {
  //       headers: AuthorizationHelpers.getAuthHeader(this.oAuthService),
  //       params: queryParams,
  //     })
  //     .subscribe((incomingResponseFiles: GoogleFiles) => {
  //       this.files.next(incomingResponseFiles.files as Array<MyFile>);
  //     });
  // }

  // uploadFileAPIv2(): void {
  //   let input = document.createElement('input');
  //   input.type = 'file';
  //   let selectedFile: any;

  //   fromEvent(input, 'change')
  //     .pipe(
  //       tap((fileMetadata: any) => {
  //         selectedFile = fileMetadata.target.files[0];
  //       }),
  //       switchMap((file: any) =>
  //         this.sendInitialRequestForUploadFileAPIv2$(selectedFile)
  //       ),
  //       switchMap((sw) => {
  //         const location: string = sw.headers.get('location')!;
  //         return this.uploadFileAPIv2$(location, selectedFile);
  //       })
  //     )
  //     .subscribe((res) => {
  //       // add toast
  //       alert('File is uploaded');
  //     });
  //   input.click();
  // }

  // uploadFileAPIv3(): void {
  //   let input = document.createElement('input');
  //   input.type = 'file';
  //   let selectedFile: any;

  //   fromEvent(input, 'change')
  //     .pipe(
  //       tap((file: any) => {
  //         selectedFile = file.target.files[0];
  //       }),
  //       switchMap((sw) => {
  //         return this.sendInitialRequestForUploadFileAPIv3$(selectedFile);
  //       }),
  //       switchMap((sw) => {
  //         const location: string = sw.headers.get('location')!;
  //         return this.uploadFileAPIv3$(location, selectedFile);
  //       })
  //     )
  //     .subscribe((res) => {});
  //   input.click();
  // }

  // private sendInitialRequestForUploadFileAPIv2$(file: File): Observable<any> {
  //   const apiUrl: string = `https://www.googleapis.com/upload/drive/v2/files`;
  //   let headers = AuthorizationHelpers.getAuthHeader(this.oAuthService);
  //   headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
  //   headers = headers.append(
  //     'X-Upload-Content-Type',
  //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  //   );
  //   // console.log('selectedFile', file);
  //   let params: HttpParams = new HttpParams();
  //   params = params.append('uploadType', 'resumable');

  //   return this.http.post(
  //     apiUrl,
  //     {
  //       title: file.name,
  //       mimeType:
  //         'application/vnd.google-apps.document',
  //       // mimeType:
  //       //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //       parents: [
  //         {
  //           id: '1hPfQ7gNv6NSvPgt1cjgL4iI2tf6qMYq-',
  //           isRoot: false,
  //           kind: 'drive#file',
  //         },
  //       ],
  //     },
  //     {
  //       observe: 'response',
  //       headers,
  //       params,
  //     }
  //   );
  // }

  // private uploadFileAPIv2$(apiUrl: string, file: File): Observable<any> {
  //   const headers: HttpHeaders = AuthorizationHelpers.getAuthHeader(
  //     this.oAuthService
  //   );

  //   const params: HttpParams = new HttpParams({});

  //   return from(file.arrayBuffer()).pipe(
  //     switchMap((sw) => {
  //       return this.http.post(apiUrl, sw, {
  //         headers,
  //         params,
  //       });
  //     })
  //   );
  // }

  // private sendInitialRequestForUploadFileAPIv3$(file: File): Observable<any> {
  //   const urlInit: string = `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable`;
  //   const headersInit = AuthorizationHelpers.getAuthHeader(this.oAuthService);
  //   headersInit.append('Content-Type', 'application/json; charset=UTF-8');
  //   headersInit.append(
  //     'X-Upload-Content-Type',
  //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  //   );
  //   console.log('selectedFile', file);

  //   return this.http.post(
  //     urlInit,
  //     { name: file.name },
  //     {
  //       observe: 'response',
  //       headers: headersInit,
  //     }
  //   );
  // }

  // private uploadFileAPIv3$(location: string, file: File): Observable<any> {
  //   const headers = AuthorizationHelpers.getAuthHeader(this.oAuthService);
  //   headers.append('Content-Type', 'application/json; charset=UTF-8');

  //   return from(file.arrayBuffer()).pipe(
  //     switchMap((sw) => {
  //       return this.http.put(location, sw, {
  //         headers,
  //       });
  //     })
  //   );
  // }

  // fillTemplate(document: MyFile): void {
  //   this.copyFile$(document)
  //     .pipe(switchMap((sw: any) => this.batchUpdate$(sw.id)))
  //     .subscribe();
  // }

  // private copyFile$(document: MyFile): Observable<any> {
  //   const apiUrl: string = `https://www.googleapis.com/drive/v2/files/${document.id}/copy`;
  //   const headers: HttpHeaders = AuthorizationHelpers.getAuthHeader(
  //     this.oAuthService
  //   );

  //   return this.http.post(
  //     apiUrl,
  //     {
  //       title: `copy ${document.name}`,
  //       parents: document.parents,
  //     },
  //     { headers }
  //   );
  // }

  // batchUpdate$(documentId: string): Observable<any> {
  //   const apiUrl: string = `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`;
  //   const headers: HttpHeaders = AuthorizationHelpers.getAuthHeader(
  //     this.oAuthService
  //   );

  //   return this.http.post(
  //     apiUrl,
  //     {
  //       requests: [
  //         {
  //           replaceAllText: {
  //             replaceText: 'Имя',
  //             containsText: {
  //               text: '{{name}}',
  //               matchCase: true,
  //             },
  //           },
  //         },
  //       ],
  //       writeControl: {},
  //     },
  //     { headers }
  //   );
  // }
}
