import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vagas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('endereco_vaga', 4).notNullable()
      table.integer('apartamento_id').unsigned().references('apartamentos.id').notNullable()
      table.integer('localizacao_id').unsigned().references('localizacaos.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}