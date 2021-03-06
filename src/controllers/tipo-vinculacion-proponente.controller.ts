import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TipoVinculacion,
  Proponente,
} from '../models';
import {TipoVinculacionRepository} from '../repositories';

export class TipoVinculacionProponenteController {
  constructor(
    @repository(TipoVinculacionRepository) protected tipoVinculacionRepository: TipoVinculacionRepository,
  ) { }

  @get('/tipo-vinculacions/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Array of TipoVinculacion has many Proponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proponente>,
  ): Promise<Proponente[]> {
    return this.tipoVinculacionRepository.proponentes(id).find(filter);
  }

  @post('/tipo-vinculacions/{id}/proponentes', {
    responses: {
      '200': {
        description: 'TipoVinculacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proponente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoVinculacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {
            title: 'NewProponenteInTipoVinculacion',
            exclude: ['id'],
            optional: ['id_vinculacion']
          }),
        },
      },
    }) proponente: Omit<Proponente, 'id'>,
  ): Promise<Proponente> {
    return this.tipoVinculacionRepository.proponentes(id).create(proponente);
  }

  @patch('/tipo-vinculacions/{id}/proponentes', {
    responses: {
      '200': {
        description: 'TipoVinculacion.Proponente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {partial: true}),
        },
      },
    })
    proponente: Partial<Proponente>,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.tipoVinculacionRepository.proponentes(id).patch(proponente, where);
  }

  @del('/tipo-vinculacions/{id}/proponentes', {
    responses: {
      '200': {
        description: 'TipoVinculacion.Proponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.tipoVinculacionRepository.proponentes(id).delete(where);
  }
}
