import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Facultad} from './facultad.model';
import {Proponente} from './proponente.model';
import {DepartamentoProponente} from './departamento-proponente.model';

@model()
export class Departamento extends Entity {
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
  nombre: string;

  @belongsTo(() => Facultad, {name: 'facultad'})
  id_facultad: number;

  @hasMany(() => Proponente, {through: {model: () => DepartamentoProponente, keyFrom: 'id_departamento', keyTo: 'id_proponente'}})
  proponentes: Proponente[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
