import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Bloco from './bloco.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Pessoa from './pessoa.js'

export default class Apartamento extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare unidade: string

  @column()
  declare numero: number

  @column()
  declare quantidadeMoradores: number

  @column()
  declare andar: number

  @column()
  declare blocoId: number

  @column()
  declare pessoaId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Bloco)
  declare bloco: BelongsTo<typeof Bloco>

  @belongsTo(() => Pessoa)
  declare pessoa: BelongsTo<typeof Pessoa>
}