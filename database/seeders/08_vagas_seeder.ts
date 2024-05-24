import Vaga from '#models/vaga'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await Vaga.createMany([
      {apartamentoId: 1, enderecoVaga: 'A001', localizacaoId: 1}
    ])
  }
}