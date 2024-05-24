import Localizacao from '#models/localizacao'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await Localizacao.createMany([
      {nome: 'Terreo'},
      {nome: 'Subsolo'},
    ])
  }
}