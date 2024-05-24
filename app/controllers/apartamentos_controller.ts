import type { HttpContext } from '@adonisjs/core/http'

import Apartamento from "#models/apartamento";

export default class ApartamentosController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await Apartamento.query()
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    try {
      return await Apartamento.findOrFail(params.id)
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
    const data = request.only(['unidade', 'numero', 'quantidadeMoradores', 'andar', 'blocoId', 'pessoaId'])
    return await Apartamento.create(data)
  }

  async update({params, request}: HttpContext) {
    const apartamento = await Apartamento.findOrFail(params.id)
    const data = request.only(['unidade', 'numero', 'quantidadeMoradores', 'andar', 'blocoId', 'pessoaId'])

    try {
      apartamento.merge(data)
      await apartamento.save()
      return {message: 'Registro alterado com sucesso. ', apartamento}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const apartamento = await Apartamento.findOrFail(params.id)
    
    try {
      await apartamento.delete()
      return {message: 'Registro deletado com sucesso. ', apartamento}
    } catch (error) {
      return {message: error}
    }
  }
}