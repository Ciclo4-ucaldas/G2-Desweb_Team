import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Menu} from './menu.model';

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

  @hasMany(() => Menu)
  susMenus: Menu[];

  constructor(data?: Partial<Restaurante>) {
    super(data);
  }
}

export interface RestauranteRelations {
  // describe navigational properties here
}

export type RestauranteWithRelations = Restaurante & RestauranteRelations;
