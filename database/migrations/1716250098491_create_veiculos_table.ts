import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'veiculos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('placa', 7).notNullable()
      table.string('cor', 45)
      table.integer('tipo_veiculo_id').unsigned().references('tipo_veiculos.id').notNullable()
      table.integer('apartamento_id').unsigned().references('apartamentos.id').notNullable()
      table.integer('imagem_id').unsigned().references('imagems.id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}