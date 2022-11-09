import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Pedido, Menu} from '../models';
import {PedidoRepository} from './pedido.repository';
import {MenuRepository} from './menu.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.Id,
  ProductoRelations
> {

  public readonly elPedido: HasManyRepositoryFactory<Pedido, typeof Producto.prototype.Id>;

  public readonly suMenu: HasManyRepositoryFactory<Menu, typeof Producto.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MenuRepository') protected menuRepositoryGetter: Getter<MenuRepository>,
  ) {
    super(Producto, dataSource);
    this.suMenu = this.createHasManyRepositoryFactoryFor('suMenu', menuRepositoryGetter,);
    this.elPedido = this.createHasManyRepositoryFactoryFor('elPedido', pedidoRepositoryGetter,);
  }
}
