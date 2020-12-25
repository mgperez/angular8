import { Component, OnInit } from '@angular/core';
import {GmailService} from '../../services/gmail.service';


@Component({
  selector: 'app-lista-correos-gmail',
  templateUrl: './lista-correos-gmail.component.html',
  styleUrls: ['./lista-correos-gmail.component.scss']
})
export class ListaCorreosGmailComponent implements OnInit {

  correos: any[];

  constructor(private gmail: GmailService) {
    this.correos = [];
  }

  ngOnInit(): void {
    // this.getRecibidos();
  }

  clickResponder(correo: any): void {
    correo.responder = !correo.responder;
  }

  accionRespuestaRapida(correo: any): void {
    correo.responder = false;
  }

  public getRecibidos(): void {
    this.gmail.getRecibidos().subscribe(
      (response) => {
        const mensajes = response.messages;

        mensajes.forEach(element => {
          this.getMensaje(element.id);
        });
      },
      (error) => this.error(error)
    );
  }

  getMensaje(id: string): void {
    this.gmail.getMessage(id).subscribe(
      (response) => {
        const emisor = response.payload.headers.find(e => e.name === "From");
        const subject = response.payload.headers.find(e => e.name === "Subject");

        const mensage = {
          id: response.id,
          cuerpo: response.snippet,
          emisor: emisor? emisor.value : undefined,
          titulo: subject? subject.value : undefined,
        };
        this.correos.push(mensage);
      },
      (error) => this.error(error)
    );
  }

  error(error): void {
    console.warn("ERROR");
  }

}
