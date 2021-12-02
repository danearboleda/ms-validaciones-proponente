import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proponente,
  Departamento,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteDepartamentoController {
  constructor(
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Proponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.number('id') id: typeof Proponente.prototype.id,
  ): Promise<Departamento> {
    return this.proponenteRepository.tiene_departamento(id);
  }
}
