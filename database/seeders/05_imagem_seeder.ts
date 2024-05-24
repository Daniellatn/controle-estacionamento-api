import Imagem from '#models/imagem'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await Imagem.createMany([
      {nome: 'imagem-moto', tipo: 'jpg', imagem: 'Teste'},
    ])
  }
}