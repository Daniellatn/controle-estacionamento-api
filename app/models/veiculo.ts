import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import TipoVeiculo from './tipo_veiculo.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Apartamento from './apartamento.js'
import Imagem from './imagem.js'

export default class Veiculo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare placa: string

  @column()
  declare cor: string

  @column()
  declare tipoVeiculoId: number

  @column()
  declare apartamentoId: number

  @column()
  declare imagemId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => TipoVeiculo)
  declare tipoVeiculo: BelongsTo<typeof TipoVeiculo>

  @belongsTo(() => Apartamento)
  declare apartamento: BelongsTo<typeof Apartamento>

  @belongsTo(() => Imagem)
  declare imagem: BelongsTo<typeof Imagem>
}