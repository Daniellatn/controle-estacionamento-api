import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Localizacao from './localizacao.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Apartamento from './apartamento.js'

export default class Vaga extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare enderecoVaga: string

  @column()
  declare apartamentoId: number

  @column()
  declare localizacaoId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Localizacao)
  declare localizacao: BelongsTo<typeof Localizacao>

  @belongsTo(() => Apartamento)
  declare apartamento: BelongsTo<typeof Apartamento>
}