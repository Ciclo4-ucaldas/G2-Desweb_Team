import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Restaurante} from './restaurante.model';
import {Producto} from './producto.model';

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

  @hasMany(() => Producto)
  susProductosOfrecidos: Producto[];

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // describe navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;
