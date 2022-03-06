import { TarjetaService } from './../../services/tarjeta.service';
import { TarjetaCredito } from './../../models/TarjetaCredito';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
form: FormGroup;
  constructor(private fb: FormBuilder,
    private _tarjetaService: TarjetaService,
    private toaster: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
  }
crearTarjeta(){
  const TARJETA: TarjetaCredito={
    titular: this.form.value.titular,
    numeroTarjeta: this.form.value.numeroTarjeta,
    fechaExpiracion: this.form.value.fechaExpiracion,
    cvv: this.form.value.cvv,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date(),
  }
  this._tarjetaService.guardarTarjeta(TARJETA).then(() => {
    this.toaster.success('Tarjeta de credito guardada','Guardado');
    this.form.reset();
  } )
}
}
