import TipoVeiculo from '#models/tipo_veiculo'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await TipoVeiculo.createMany([
      {nome: 'Moto'},
      {nome: 'Carro Eletrico'},
    ])
  }
}