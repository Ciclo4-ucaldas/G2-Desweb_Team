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
  Restaurante,
  Menu,
} from '../models';
import {RestauranteRepository} from '../repositories';

export class RestauranteMenuController {
  constructor(
    @repository(RestauranteRepository) protected restauranteRepository: RestauranteRepository,
  ) { }

  @get('/restaurantes/{id}/menus', {
    responses: {
      '200': {
        description: 'Array of Restaurante has many Menu',
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
    return this.restauranteRepository.susMenus(id).find(filter);
  }

  @post('/restaurantes/{id}/menus', {
    responses: {
      '200': {
        description: 'Restaurante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Menu)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Restaurante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {
            title: 'NewMenuInRestaurante',
            exclude: ['id'],
            optional: ['restauranteId']
          }),
        },
      },
    }) menu: Omit<Menu, 'id'>,
  ): Promise<Menu> {
    return this.restauranteRepository.susMenus(id).create(menu);
  }

  @patch('/restaurantes/{id}/menus', {
    responses: {
      '200': {
        description: 'Restaurante.Menu PATCH success count',
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
    return this.restauranteRepository.susMenus(id).patch(menu, where);
  }

  @del('/restaurantes/{id}/menus', {
    responses: {
      '200': {
        description: 'Restaurante.Menu DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Menu)) where?: Where<Menu>,
  ): Promise<Count> {
    return this.restauranteRepository.susMenus(id).delete(where);
  }
}
