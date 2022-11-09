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
  Producto,
  Menu,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoMenuController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/menus', {
    responses: {
      '200': {
        description: 'Array of Producto has many Menu',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Menu)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Menu>,
  ): Promise<Menu[]> {
    return this.productoRepository.suMenu(id).find(filter);
  }

  @post('/productos/{id}/menus', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Menu)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {
            title: 'NewMenuInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) menu: Omit<Menu, 'id'>,
  ): Promise<Menu> {
    return this.productoRepository.suMenu(id).create(menu);
  }

  @patch('/productos/{id}/menus', {
    responses: {
      '200': {
        description: 'Producto.Menu PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {partial: true}),
        },
      },
    })
    menu: Partial<Menu>,
    @param.query.object('where', getWhereSchemaFor(Menu)) where?: Where<Menu>,
  ): Promise<Count> {
    return this.productoRepository.suMenu(id).patch(menu, where);
  }

  @del('/productos/{id}/menus', {
    responses: {
      '200': {
        description: 'Producto.Menu DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Menu)) where?: Where<Menu>,
  ): Promise<Count> {
    return this.productoRepository.suMenu(id).delete(where);
  }
}
