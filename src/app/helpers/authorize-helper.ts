import { HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

export class AuthorizationHelpers {
  static getAuthHeader(oAuthService: OAuthService): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${oAuthService.getAccessToken()}`,
    });
  }
}
