import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
}