import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'apartamentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('unidade', 5).notNullable()
      table.integer('numero').notNullable()
      table.integer('quantidade_moradores')
      table.integer('andar').notNullable()
      table.integer('bloco_id').unsigned().references('blocos.id').notNullable()
      table.integer('pessoa_id').unsigned().references('pessoas.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}