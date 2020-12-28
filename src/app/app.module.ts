import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Main files
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { CorreoComponent } from './components/correo/correo.component';
import { ListaCorreosComponent } from './components/lista-correos/lista-correos.component';
import { ListaCorreosGmailComponent } from './components/lista-correos-gmail/lista-correos-gmail.component';
import { NuevoCorreoComponent } from './components/nuevo-correo/nuevo-correo.component';
import { AvisosComponent } from './components/avisos/avisos.component';
import { LoginComponent } from './components/login/login.component';


// View and Menu
import { MenuComponent } from './menus/menu/menu.component';
import { HomeComponent } from './views/home/home.component';
import { CorreosRecibidosComponent } from './views/correos-recibidos/correos-recibidos.component';
import { EnviarComponent } from './views/enviar/enviar.component';
import { VisualizarCorreoComponent } from './views/visualizar-correo/visualizar-correo.component';

// Material Libs
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// External Libs
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "374443698323-pfan501olhgle37c2pa0rtna4o9c9052.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  ux_mode: "popup",
  redirect_uri: "http://localhost:4200/loged",
  fetch_basic_profile: true,
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/gmail.labels",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly"
  ].join(" ")
};

@NgModule({
  declarations: [
    AppComponent,
    CorreoComponent,
    ListaCorreosComponent,
    NuevoCorreoComponent,
    AvisosComponent,
    CorreosRecibidosComponent,
    LoginComponent,
    ListaCorreosGmailComponent,
    HomeComponent,
    EnviarComponent,
    VisualizarCorreoComponent,
    MenuComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      GoogleApiModule.forRoot({
          provide: NG_GAPI_CONFIG,
          useValue: gapiClientConfig
      }),
      BrowserAnimationsModule,
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatDividerModule,
      MatInputModule,
      MatTableModule,
      MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
