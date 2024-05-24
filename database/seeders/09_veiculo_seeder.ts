import Veiculo from '#models/veiculo'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await Veiculo.createMany([
      {apartamentoId: 1, cor: 'Branco', imagemId: 1, placa: 'JIH2541', tipoVeiculoId: 2}
    ])
  }
}