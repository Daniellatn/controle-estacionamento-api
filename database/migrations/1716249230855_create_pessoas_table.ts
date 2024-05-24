import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pessoas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 200).notNullable()
      table.string('telefone', 11).notNullable()
      table.string('genero', 1)
      table.string('cpf', 11).notNullable()
      table.string('email', 100).notNullable()
      table.integer('tipo_pessoa_id').unsigned().references('tipo_pessoas.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}