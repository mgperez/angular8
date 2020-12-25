import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public login: LoginService) { }

  ngOnInit(): void {}

  signOut(): void {
    this.login.signOut();
  }

  signIn(): void {
    this.login.signIn();
  }

  getNombre(): string {
    return this.login.profile.Ad;
    // return this.login.profile.getName();
  }

  getEmail(): string {
    return this.login.profile.du;
    // return this.login.profile.getEmail();
  }
}
