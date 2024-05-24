import TipoPessoa from '#models/tipo_pessoa'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await TipoPessoa.createMany([
      {nome: 'Admin'},
      {nome: 'Morador'},
      {nome: 'Sindico'},
    ])
  }
}