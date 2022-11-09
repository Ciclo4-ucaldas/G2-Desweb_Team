import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Producto} from './producto.model';
import {Cliente} from './cliente.model';

@model()
export class Pedido extends Entity {
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
  Menu: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  Total_Pago: number;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @hasMany(() => Producto)
  susProductos: Producto[];

  @hasOne(() => Cliente)
  suCliente: Cliente;

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
