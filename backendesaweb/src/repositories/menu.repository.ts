import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Menu, MenuRelations, Restaurante} from '../models';
import {RestauranteRepository} from './restaurante.repository';

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype.id,
  MenuRelations
> {

  public readonly suRestaurante: BelongsToAccessor<Restaurante, typeof Menu.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RestauranteRepository') protected restauranteRepositoryGetter: Getter<RestauranteRepository>,
  ) {
    super(Menu, dataSource);
    this.suRestaurante = this.createBelongsToAccessorFor('suRestaurante', restauranteRepositoryGetter,);
    this.registerInclusionResolver('suRestaurante', this.suRestaurante.inclusionResolver);
  }
}
