import Pessoa from '#models/pessoa'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    return await Pessoa.createMany([
      {nome: 'Maria', cpf:'12345678966', email: 'maria@gmail.com', genero: 'F', telefone: '61985642315', tipoPessoaId: 2},
    ])
  }
}