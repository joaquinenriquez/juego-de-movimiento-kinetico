import { Injectable } from '@angular/core';

import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  showMessage(title: string, text: string, icon: SweetAlertIcon) 
  {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar',
      backdrop: false // transparente
    })
  }


}
