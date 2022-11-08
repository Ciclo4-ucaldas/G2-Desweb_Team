import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
  })
  restauranteId?: string;

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // describe navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;
