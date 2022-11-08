import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';

@model()
export class Restaurante extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @belongsTo(() => Administrador, {name: 'suAdministrador'})
  administradorId: string;

  constructor(data?: Partial<Restaurante>) {
    super(data);
  }
}

export interface RestauranteRelations {
  // describe navigational properties here
}

export type RestauranteWithRelations = Restaurante & RestauranteRelations;
