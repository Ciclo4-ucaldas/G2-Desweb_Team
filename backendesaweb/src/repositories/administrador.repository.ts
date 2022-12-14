import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Restaurante} from '../models';
import {RestauranteRepository} from './restaurante.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly suRestaurante: HasOneRepositoryFactory<Restaurante, typeof Administrador.prototype.id>;

  public readonly suAdministrador: HasManyRepositoryFactory<Restaurante, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RestauranteRepository') protected restauranteRepositoryGetter: Getter<RestauranteRepository>,
  ) {
    super(Administrador, dataSource);
    this.suAdministrador = this.createHasManyRepositoryFactoryFor('suAdministrador', restauranteRepositoryGetter,);
    this.suRestaurante = this.createHasOneRepositoryFactoryFor('suRestaurante', restauranteRepositoryGetter);
    this.registerInclusionResolver('suRestaurante', this.suRestaurante.inclusionResolver);
  }
}
