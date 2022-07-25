import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var gapi: any;

@Injectable()
export class LoaderService {
  constructor(private httpClient: HttpClient) {}

  // private initGoogleOAuth$(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     gapi.load(
  //       'auth2',
  //       async () => {
  //         const gAuth = await gapi.auth2.init({
  //           client_id: environment.GAPI_CLIENT_ID,
  //           fetch_basic_profile: true,
  //           scope: 'profile email',
  //         });
  //         resolve(gAuth);
  //       },
  //       reject
  //     );
  //   });
  // }

  // fetchGoogleUser$(): Observable<any> {
  //   return from(
  //     new Promise(async (resolve, reject) => {
  //       try {
  //         const gAuth = await this.initGoogleOAuth$();

  //         const oAuthUser = await gAuth.signIn();
  //         const authResponse = gAuth.currentUser.get().getAuthResponse();

  //         sessionStorage.setItem('accessToken', authResponse.access_token);

  //         resolve(authResponse);
  //       } catch (e) {
  //         reject(e);
  //       }
  //     })
  //   );
  // }

  load$(file: File): Observable<any> {
    let fd: FormData = new FormData();
    fd.append('file', file);

    console.log(file);
    alert(localStorage.getItem('google_token'));
    return this.httpClient.post(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
      fd,
      {
        headers: new HttpHeaders({
          'Content-Type': 'MIME',
          Authorization: `Bearer ${localStorage.getItem('google_token')}`,
        }),
      }
    );
  }

  auth$(): Observable<any> {
    return this.httpClient.post(
      'https://oauth2.googleapis.com/token',
      {
        grant_type: 'grant_type=urn\%3Aietf\%3Aparams\%3Aoauth\%3Agrant\-type\%3Ajwt\-bearer',
        assertion: localStorage.getItem('google_token'),
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }
}
