import Bloco from '#models/bloco'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await Bloco.createMany([
      {nome: 'A', descricao: 'Torre Azul'},
      {nome: 'B', descricao: 'Torre Verde'},
    ])
  }
}