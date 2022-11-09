import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {Menu} from './menu.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo_producto: string;

  @property({
    type: 'string',
  })
  menuId?: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  @hasMany(() => Pedido)
  elPedido: Pedido[];

  @hasMany(() => Menu)
  suMenu: Menu[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
