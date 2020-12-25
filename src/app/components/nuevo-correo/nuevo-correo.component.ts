import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AvisosService} from '../../services/avisos.service';
import {GmailService} from '../../services/gmail.service';

@Component({
  selector: 'app-nuevo-correo',
  templateUrl: './nuevo-correo.component.html',
  styleUrls: ['./nuevo-correo.component.scss']
})
export class NuevoCorreoComponent implements OnInit {

  nuevoCorreo: FormGroup;
  submitted = false;
  @Input() correo: any;
  @Output() accionRealizada: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private servicioAvisos: AvisosService, private gmail: GmailService) {
    // Called first time before the ngOnInit()
    // this.nuevoCorreo = this.createForm(formBuilder);
  }

  ngOnInit(): void {
    // Called after the constructor and called  after the first ngOnChanges()
    this.nuevoCorreo = this.createForm(this.formBuilder);

    if(this.correo != undefined){
      // console.log("A",this.correo);
      this.nuevoCorreo.patchValue({
        titulo: 'Re: '+ this.correo.titulo,
        destinatario: this.correo.emisor
      });
    }
  }

  get formulario(): { [p: string]: AbstractControl } {
    return this.nuevoCorreo.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.nuevoCorreo.invalid) {
      return;
    }

    let correo = this.nuevoCorreo.value;
    /*correo.leido = false;
    correo.emisor = 'correoEmisor1@openWebinar.inv';*/

    const texto = correo.cuerpo;
    const destinatario = correo.destinatario;
    const asunto = correo.titulo;

    // alert('Correo Enviado \nEliminamos el formulario');
    this.onReset();
    // this.servicioAvisos.showMenssage(`Correo enviado a ${correo.emisor}`);

    this.gmail.sendMessage(texto, destinatario, asunto).subscribe(
      (response) => {
        console.log("respuesta envio", response);
        this.servicioAvisos.showMenssage(`Correo enviado a ${correo.destinatario}`);
      },
      (error) => {
        this.servicioAvisos.showMenssage(`Fallo en el envio`);
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.nuevoCorreo.reset();
    this.accionRealizada.emit();
  }

  cancel(): void {
    this.onReset();
    this.servicioAvisos.showMenssage("Envio Cancelado");
  }

  private createForm(formBuilder: FormBuilder) {
    // return undefined;
    /*
    this.nuevoCorreo = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cuerpo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      destinatario: new FormControl('', [Validators.required, Validators.email])
    });
     */
    return formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      cuerpo: ['', [Validators.required, Validators.minLength(10)]],
      destinatario: ['', [Validators.required, Validators.email]],
    });
  }
}
