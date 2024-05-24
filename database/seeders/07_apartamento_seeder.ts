import Apartamento from '#models/apartamento'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await Apartamento.createMany([
      {andar: 1, numero: 106, quantidadeMoradores: 2, blocoId: 1,  unidade: 'A106', pessoaId: 1}
    ])
  }
}