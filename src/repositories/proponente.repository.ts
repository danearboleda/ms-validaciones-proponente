import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, TipoVinculacion, Departamento} from '../models';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';
import {DepartamentoRepository} from './departamento.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly vinculaciones: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  public readonly tiene_departamento: BelongsToAccessor<Departamento, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Proponente, dataSource);
    this.tiene_departamento = this.createBelongsToAccessorFor('tiene_departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('tiene_departamento', this.tiene_departamento.inclusionResolver);
    this.vinculaciones = this.createBelongsToAccessorFor('vinculaciones', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('vinculaciones', this.vinculaciones.inclusionResolver);
  }
}
