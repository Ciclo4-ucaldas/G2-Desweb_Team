import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Pedido,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePedidoController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.string('id') id: typeof Cliente.prototype.Id,
  ): Promise<Pedido> {
    return this.clienteRepository.susPedidos(id);
  }
}
