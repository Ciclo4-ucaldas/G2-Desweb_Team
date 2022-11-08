import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Restaurante, RestauranteRelations, Administrador} from '../models';
import {AdministradorRepository} from './administrador.repository';

export class RestauranteRepository extends DefaultCrudRepository<
  Restaurante,
  typeof Restaurante.prototype.id,
  RestauranteRelations
> {

  public readonly suAdministrador: BelongsToAccessor<Administrador, typeof Restaurante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Restaurante, dataSource);
    this.suAdministrador = this.createBelongsToAccessorFor('suAdministrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('suAdministrador', this.suAdministrador.inclusionResolver);
  }
}
