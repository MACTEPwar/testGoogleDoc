import { UploadFileComponent } from './../../components/upload-file/upload-file.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile$(file: File, folderId: string | null = null): Observable<any> {
    const apiUrl = `${environment.apiUrl}/file/upload`;
    const fd: FormData = new FormData();
    fd.append('file', file);
    if (folderId != null) {
      fd.append('parentFolderId', folderId);
    }

    return this.http.post(apiUrl, fd);
  }
}
