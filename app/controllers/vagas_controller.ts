import type { HttpContext } from '@adonisjs/core/http'

import Vaga from "#models/vaga";

export default class VagasController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await Vaga.query()
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    try {
      return await Vaga.findOrFail(params.id)
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
    const data = request.only(['enderecoVaga', 'apartamentoId', 'localizacaoId'])
    return await Vaga.create(data)
  }

  async update({params, request}: HttpContext) {
    const vaga = await Vaga.findOrFail(params.id)
    const data = request.only(['enderecoVaga', 'apartamentoId', 'localizacaoId'])

    try {
      vaga.merge(data)
      await vaga.save()
      return {message: 'Registro alterado com sucesso. ', vaga}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const vaga = await Vaga.findOrFail(params.id)
    
    try {
      await vaga.delete()
      return {message: 'Registro deletado com sucesso. ', vaga}
    } catch (error) {
      return {message: error}
    }
  }
}