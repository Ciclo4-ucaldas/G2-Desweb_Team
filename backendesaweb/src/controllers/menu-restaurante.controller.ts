import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Menu,
  Restaurante,
} from '../models';
import {MenuRepository} from '../repositories';

export class MenuRestauranteController {
  constructor(
    @repository(MenuRepository)
    public menuRepository: MenuRepository,
  ) { }

  @get('/menus/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Restaurante belonging to Menu',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurante)},
          },
        },
      },
    },
  })
  async getRestaurante(
    @param.path.string('id') id: typeof Menu.prototype.id,
  ): Promise<Restaurante> {
    return this.menuRepository.suRestaurante(id);
  }
}
