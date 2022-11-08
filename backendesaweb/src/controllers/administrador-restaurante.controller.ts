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
  Administrador,
  Restaurante,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorRestauranteController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Administrador has one Restaurante',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Restaurante),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Restaurante>,
  ): Promise<Restaurante> {
    return this.administradorRepository.suRestaurante(id).get(filter);
  }

  @post('/administradors/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restaurante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurante, {
            title: 'NewRestauranteInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) restaurante: Omit<Restaurante, 'id'>,
  ): Promise<Restaurante> {
    return this.administradorRepository.suRestaurante(id).create(restaurante);
  }

  @patch('/administradors/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Administrador.Restaurante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurante, {partial: true}),
        },
      },
    })
    restaurante: Partial<Restaurante>,
    @param.query.object('where', getWhereSchemaFor(Restaurante)) where?: Where<Restaurante>,
  ): Promise<Count> {
    return this.administradorRepository.suRestaurante(id).patch(restaurante, where);
  }

  @del('/administradors/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Administrador.Restaurante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Restaurante)) where?: Where<Restaurante>,
  ): Promise<Count> {
    return this.administradorRepository.suRestaurante(id).delete(where);
  }
}
