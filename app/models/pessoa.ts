import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import TipoPessoa from './tipo_pessoa.js'

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare telefone: string

  @column()
  declare genero: string

  @column()
  declare cpf: string

  @column()
  declare email: string

  @column()
  declare tipoPessoaId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => TipoPessoa)
  declare tipoPessoa: BelongsTo<typeof TipoPessoa>
}