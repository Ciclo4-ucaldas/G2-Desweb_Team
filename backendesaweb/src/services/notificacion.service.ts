import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generator =require("password-generator");
const crytoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  GenerarClave(){
    let clave = generator(8, false)
    return clave;
  }
  cifrarClave(clave: string){
    let claveCifrada=crytoJS.MD5(clave).tostring()
    return claveCifrada
  }

  notificacionEmail(){
    

  }
  notificacionSMS(){
  }
}


}
