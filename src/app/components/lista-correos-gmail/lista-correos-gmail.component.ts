import { Component, OnInit } from '@angular/core';
import {GmailService} from '../../services/gmail.service';
import {Router} from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {AvisosService} from '../../services/avisos.service';
import {Correo} from '../../interfaces/correo';


@Component({
  selector: 'app-lista-correos-gmail',
  templateUrl: './lista-correos-gmail.component.html',
  styleUrls: ['./lista-correos-gmail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListaCorreosGmailComponent implements OnInit {

  // correos: Correo[];
  columnsToDisplay: string[] = ['Emisor', 'Asunto', 'Acciones'];
  displayedColumns: string[] = ['emisor', 'titulo', 'id'];
  dataSource = new MatTableDataSource<Correo>();
  expandedElement: any | null;

  constructor(private gmail: GmailService, private router: Router, private servicioAvisos: AvisosService) {
    // this.correos = [];
  }

  ngOnInit(): void {
    this.getRecibidos();
  }

  /*clickResponder(correo: any): void {
    correo.responder = !correo.responder;
  }*/

  accionRespuestaRapida(correo: Correo): void {
    // correo.responder = false;
    this.expandedElement = null;
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
        // this.correos.push(mensage);
        this.dataSource.data.push(mensage);
        this.dataSource._updateChangeSubscription();
      },
      (error) => this.error(error)
    );
  }

  error(error): void {
    // console.warn("ERROR");
    this.servicioAvisos.showMenssage("Se ha producido un error", 'Error');
  }

  verDetalle(correo): void {
    this.router.navigate(['/mail', {correo: JSON.stringify(correo)}]);
  }

}
