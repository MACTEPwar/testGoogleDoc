import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  logoutUrl: 'https://www.google.com/accounts/Logout',
  postLogoutRedirectUri: window.location.origin,
  redirectUriAsPostLogoutRedirectUriFallback: false,
  // clientId: environment.GAPI_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/drive',
};

@Injectable()
export class GoogleApiService {
  userProdileSubject = new Subject<UserInfo>();

  constructor(
    private readonly oAuthService: OAuthService,
    private readonly http: HttpClient
  ) {
    oAuthService.configure(oAuthConfig);

    // logout
    // 'https://appengine.google.com/_ah/logout?continue=http:localhost:4200';
    // 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:4200';

    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
          // oAuthService
          //   .fetchTokenUsingPasswordFlow(
          //     'shebanic1995@gmail.com',
          //     'Roma2005accessdenied'
          //   )
          //   .then((t) => {
          //     console.log(t);
          //   });
          // http
          //   .post(
          //     'https://oauth2.googleapis.com/token',
          //     {
          //       client_id: '738387477576-k80tvb20ts5d3pbnr0poe710ssj85gev.apps.googleusercontent.com',
          //       client_secret: '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',
          //       refresh_token: 'refresh_token',
          //       grant_type: 'refresh_token',
          //     },
          //     {
          //       headers: {
          //         'Content-Type': 'application/x-www-form-urlencoded',
          //       },
          //     }
          //   )
          //   .subscribe((res) => console.log(res));
        } else {
          // oAuthService.loadUserProfile().then((userProfile) => {
          //   console.log('userProfile', userProfile);
          //   this.userProdileSubject.next(userProfile as UserInfo);
          // });
          this.http
            .get(
              `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${this.oAuthService.getAccessToken()}`
            )
            .subscribe((res) => console.log(res));
        }
      });
    });
    // this.logIn().subscribe((res) => {
    //   window.location.href = res.url;
    //   console.log('incoming from google auth', res);
    // });
  }

  logIn(): Observable<any> {
    const apiUrl = `http://localhost:20657/oauth/RedirectInOAuthServer`;
    return this.http.post(apiUrl, {});
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut(): void {
    this.oAuthService.logOut();
    // this.oAuthService.revokeTokenAndLogout();
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.oAuthService.getAccessToken()}`,
    });
  }
}

export interface UserInfo {
  sub: string;
  email: string;
  name: string;
  picture: string;
}
