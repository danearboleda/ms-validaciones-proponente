import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proponente, ProponenteRelations, TipoVinculacion} from '../models';
import {TipoVinculacionRepository} from './tipo-vinculacion.repository';

export class ProponenteRepository extends DefaultCrudRepository<
  Proponente,
  typeof Proponente.prototype.id,
  ProponenteRelations
> {

  public readonly vinculaciones: BelongsToAccessor<TipoVinculacion, typeof Proponente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoVinculacionRepository') protected tipoVinculacionRepositoryGetter: Getter<TipoVinculacionRepository>,
  ) {
    super(Proponente, dataSource);
    this.vinculaciones = this.createBelongsToAccessorFor('vinculaciones', tipoVinculacionRepositoryGetter,);
    this.registerInclusionResolver('vinculaciones', this.vinculaciones.inclusionResolver);
  }
}
