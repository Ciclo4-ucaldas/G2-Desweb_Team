import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Restaurante, RestauranteRelations, Administrador, Menu} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {MenuRepository} from './menu.repository';

export class RestauranteRepository extends DefaultCrudRepository<
  Restaurante,
  typeof Restaurante.prototype.id,
  RestauranteRelations
> {

  public readonly suAdministrador: BelongsToAccessor<Administrador, typeof Restaurante.prototype.id>;

  public readonly susMenus: HasManyRepositoryFactory<Menu, typeof Restaurante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('MenuRepository') protected menuRepositoryGetter: Getter<MenuRepository>,
  ) {
    super(Restaurante, dataSource);
    this.susMenus = this.createHasManyRepositoryFactoryFor('susMenus', menuRepositoryGetter,);
    this.registerInclusionResolver('susMenus', this.susMenus.inclusionResolver);
    this.suAdministrador = this.createBelongsToAccessorFor('suAdministrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('suAdministrador', this.suAdministrador.inclusionResolver);
  }
}
