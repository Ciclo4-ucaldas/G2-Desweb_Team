import {model, property, hasOne, hasMany} from '@loopback/repository';
import {Persona} from '.';
import {Restaurante} from './restaurante.model';

@model()
export class Administrador extends Persona {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @hasOne(() => Restaurante)
  suRestaurante: Restaurante;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
