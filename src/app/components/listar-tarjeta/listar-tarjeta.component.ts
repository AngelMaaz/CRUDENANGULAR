import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from './../../services/tarjeta.service';
import { TarjetaCredito } from './../../models/TarjetaCredito';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
listTarjetas: TarjetaCredito[]= [];
  constructor(private _tarjetaService: TarjetaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }
obtenerTarjeta(){
  this._tarjetaService.obtenerTarjeta().subscribe(doc =>{
    this.listTarjetas= [];
    doc.forEach((element: any)=>{
      this.listTarjetas.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      })
    })
  } )
}

eliminarTarjeta(id: any){
  this._tarjetaService.eliminarTarjeta(id).then(()=>{
    this.toastr.error('Tarjeta Eliminada','Eliminar')
  })
}

editarTarjeta(tarjeta: TarjetaCredito){
  this._tarjetaService.addTarjetaEdit(tarjeta);
}

}
