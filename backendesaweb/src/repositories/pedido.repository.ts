import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Producto, Cliente} from '../models';
import {ProductoRepository} from './producto.repository';
import {ClienteRepository} from './cliente.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.Id,
  PedidoRelations
> {

  public readonly susProductos: HasManyRepositoryFactory<Producto, typeof Pedido.prototype.Id>;

  public readonly suCliente: HasOneRepositoryFactory<Cliente, typeof Pedido.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Pedido, dataSource);
    this.suCliente = this.createHasOneRepositoryFactoryFor('suCliente', clienteRepositoryGetter);
    this.susProductos = this.createHasManyRepositoryFactoryFor('susProductos', productoRepositoryGetter,);
  }
}
