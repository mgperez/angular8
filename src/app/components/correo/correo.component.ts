import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Correo} from '../../interfaces/correo';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  correo: Correo;

  constructor(private route: ActivatedRoute) {
    /*this.correo = {
      titulo: "Titulo del Email",
      cuerpo: `Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email
        Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email,
        Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email, Cuerpo del Email`,
      emisor: 'correoEmisor@openWebinar.inv',
      destinatario: 'correoReceptor@openWebinar.inv'
    }*/
    this.correo = {
      id: "",
      titulo: "",
      cuerpo: "",
      emisor: ""
    }
  }

  ngOnInit(): void {
    const datosRecibidos = this.route.snapshot.paramMap.get('correo');
    this.correo = JSON.parse(datosRecibidos);
  }

}
