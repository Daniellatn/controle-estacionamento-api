import type { HttpContext } from '@adonisjs/core/http'

import Pessoa from "#models/pessoa";

export default class PessoasController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await Pessoa.query()
                        .preload('tipoPessoa')
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    try {
      return await Pessoa.findOrFail(params.id)
    } catch (error) {
      return {message: 'Registro não encontrado.'}
    }
    // return await Bloco.query()
    //                     .where('id', params.id)
    //                     .preload('type')
    //                     .preload('ingredients')
    //                     .first()
  }

  async store({request}: HttpContext) {
    const data = request.only(['nome', 'telefone', 'genero', 'cpf', 'email', 'tipoPessoaId'])
    return await Pessoa.create(data)
  }

  async update({params, request}: HttpContext) {
    const pesssoa = await Pessoa.findOrFail(params.id)
    const data = request.only(['nome', 'telefone', 'genero', 'cpf', 'email', 'tipoPessoaId'])

    try {
      pesssoa.merge(data)
      await pesssoa.save()
      return {message: 'Registro alterado com sucesso. ', pesssoa}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const pesssoa = await Pessoa.findOrFail(params.id)
    
    try {
      await pesssoa.delete()
      return {message: 'Registro deletado com sucesso. ', pesssoa}
    } catch (error) {
      return {message: error}
    }
  }
}