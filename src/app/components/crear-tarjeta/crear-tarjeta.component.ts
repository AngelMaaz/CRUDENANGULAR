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
titulo="Crear Tarjeta"
id: string | undefined;
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
    this._tarjetaService.getTarjetaEdit().subscribe(data =>{
     this.titulo = "Editar Tarjeta";
     this.id = data.id;
     this.form.patchValue({
       titular: data.titular,
       numeroTarjeta: data.numeroTarjeta,
       fechaExpiracion: data.fechaExpiracion,
       cvv: data.cvv
     })
    })
  }
guardarTarjeta(){

if(this.id === undefined){
  this.agregarTarjeta();

}else{
  this.editarTarjeta(this.id);

}


}
agregarTarjeta(){
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
editarTarjeta(id: string){
  const TARJETA: any={
    titular: this.form.value.titular,
    numeroTarjeta: this.form.value.numeroTarjeta,
    fechaExpiracion: this.form.value.fechaExpiracion,
    cvv: this.form.value.cvv,
    fechaActualizacion: new Date(),
  }
  this._tarjetaService.editarTarjeta(id, TARJETA).then(() => {
    this.titulo="Agregar Tarjeta";
    this.id= undefined;
    this.toaster.info('Tarjeta actualizada correctamente','Actualización');
    this.form.reset();
  } )
  
}
}
