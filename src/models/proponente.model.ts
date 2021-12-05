import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {TipoVinculacion} from './tipo-vinculacion.model';

@model()
export class Proponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  PrimerNombre: string;

  @property({
    type: 'string',
  })
  OtroNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  PrimerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  SegundoApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  numCelular?: string;

  @property({
    type: 'any',
  })
  Foto?: any;

  @belongsTo(() => TipoVinculacion, {name: 'vinculaciones'})
  id_vinculacion: TipoVinculacion;

  @belongsTo(() => Departamento, {name: 'tiene_departamento'})
  id_departamento: number;

  constructor(data?: Partial<Proponente>) {
    super(data);
  }
}

export interface ProponenteRelations {
  // describe navigational properties here
}

export type ProponenteWithRelations = Proponente & ProponenteRelations;
