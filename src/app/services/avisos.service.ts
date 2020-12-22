import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  mensaje: string;
  visible: boolean;

  constructor() {
    this.mensaje = '';
    this.visible = false;
  }

  showMenssage(mensaje: string): void{
    this.mensaje = mensaje;
    this.visible = true;
    this.waitToHide();
  }

  hideMenssage(): void{
    this.visible = false;
    this.mensaje = '';
  }

  waitToHide(): void{
    setTimeout(() => {
      this.hideMenssage();
    }, 2000);
  }
}
