import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Restaurante,
  Administrador,
} from '../models';
import {RestauranteRepository} from '../repositories';

export class RestauranteAdministradorController {
  constructor(
    @repository(RestauranteRepository)
    public restauranteRepository: RestauranteRepository,
  ) { }

  @get('/restaurantes/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Restaurante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Restaurante.prototype.id,
  ): Promise<Administrador> {
    return this.restauranteRepository.suAdministrador(id);
  }
}
