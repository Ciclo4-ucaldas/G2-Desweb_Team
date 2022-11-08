import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Restaurante} from './restaurante.model';

@model()
export class Menu extends Entity {
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
  tipoMenu: string;

  @property({
    type: 'string',
    required: true,
  })
  Precio: string;

  @belongsTo(() => Restaurante, {name: 'suRestaurante'})
  restauranteId: string;

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // describe navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;
