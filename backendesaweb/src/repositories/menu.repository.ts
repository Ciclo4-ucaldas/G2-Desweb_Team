import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Menu, MenuRelations, Restaurante, Producto} from '../models';
import {RestauranteRepository} from './restaurante.repository';
import {ProductoRepository} from './producto.repository';

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype.id,
  MenuRelations
> {

  public readonly suRestaurante: BelongsToAccessor<Restaurante, typeof Menu.prototype.id>;

  public readonly susProductosOfrecidos: HasManyRepositoryFactory<Producto, typeof Menu.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RestauranteRepository') protected restauranteRepositoryGetter: Getter<RestauranteRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Menu, dataSource);
    this.susProductosOfrecidos = this.createHasManyRepositoryFactoryFor('susProductosOfrecidos', productoRepositoryGetter,);
    this.suRestaurante = this.createBelongsToAccessorFor('suRestaurante', restauranteRepositoryGetter,);
    this.registerInclusionResolver('suRestaurante', this.suRestaurante.inclusionResolver);
  }
}
