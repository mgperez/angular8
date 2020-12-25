import {Injectable, NgZone} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi';
import * as _ from "lodash";
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public static readonly SESSION_STORAGE_KEY: string = "usuarioGoogle";

  profile: any = undefined;
  tokenUser: string;
  userId: string;

  constructor(private googleAuthService: GoogleAuthService, private ngZone: NgZone) {
    if(this.isUserSignedIn()){
      this.setUser(this.getSessionUser());
    }
  }

  signIn(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(
        res => this.signInSuccessHandler(res),
        err => this.signInErrorHandler(err));
    });
  }

  signOut(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      try {
        // auth.signOut();
        auth.signOut().then(() => {
          console.log('User signed out.');
        });
        this.profile = undefined;
        this.tokenUser = undefined;
        this.userId = undefined;
      } catch (e) {
        console.error(e);
      }
      sessionStorage.removeItem(LoginService.SESSION_STORAGE_KEY);
    });
  }

  public isUserSignedIn(): boolean {
    return !_.isEmpty(sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY));
  }

  private setUser(user: GoogleUser): void {
    console.log(user);
    // this.profile = user.getBasicProfile();
    this.profile = user['xt'];
    console.log(this.profile);

    /*console.log('ID: ' + myprofile.getId());
    console.log('Full Name: ' + myprofile.getName());
    console.log('Given Name: ' + myprofile.getGivenName());
    console.log('Family Name: ' + myprofile.getFamilyName());
    console.log('Image URL: ' + myprofile.getImageUrl());
    console.log('Email: ' + myprofile.getEmail());*/

    // this.tokenUser = user.getAuthResponse().access_token;
    this.tokenUser = user['xc'].access_token;
    console.log('access_token: ' + this.tokenUser);

    /*this.profile = user['w3'];
    this.tokenUser = user['Zi'].access_token;
    this.userId = this.profile['Eea'];*/

    this.userId = this.profile.OT;
    // this.userId = this.profile.getId();
    console.log('userId: ' + this.userId);
  }

  private getSessionUser(): any {
    let user: string = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
    if (!user) {
      throw new Error("no token set , authentication required");
    }
    return JSON.parse(user);
  }

  private signInSuccessHandler(res: GoogleUser): void {
    this.ngZone.run(() => {
      this.setUser(res);
      sessionStorage.setItem(
        LoginService.SESSION_STORAGE_KEY, JSON.stringify(res)
      );
    });
  }

  private signInErrorHandler(err: any): void {
    // return undefined;
    console.warn(err);
  }

}
