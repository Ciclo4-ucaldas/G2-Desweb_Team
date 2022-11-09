import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Menu,
  Producto,
} from '../models';
import {MenuRepository} from '../repositories';

export class MenuProductoController {
  constructor(
    @repository(MenuRepository) protected menuRepository: MenuRepository,
  ) { }

  @get('/menus/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Menu has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.menuRepository.susProductosOfrecidos(id).find(filter);
  }

  @post('/menus/{id}/productos', {
    responses: {
      '200': {
        description: 'Menu model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Menu.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInMenu',
            exclude: ['Id'],
            optional: ['menuId']
          }),
        },
      },
    }) producto: Omit<Producto, 'Id'>,
  ): Promise<Producto> {
    return this.menuRepository.susProductosOfrecidos(id).create(producto);
  }

  @patch('/menus/{id}/productos', {
    responses: {
      '200': {
        description: 'Menu.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.menuRepository.susProductosOfrecidos(id).patch(producto, where);
  }

  @del('/menus/{id}/productos', {
    responses: {
      '200': {
        description: 'Menu.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.menuRepository.susProductosOfrecidos(id).delete(where);
  }
}
