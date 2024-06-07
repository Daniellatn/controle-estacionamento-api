import type { HttpContext } from '@adonisjs/core/http'

import Localizacao from "#models/localizacao";
import Vaga from '#models/vaga';

export default class LocalizacaosController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await Localizacao.query()
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    // try {
    //   return await Localizacao.findOrFail(params.id)
    // } catch (error) {
    //   return {message: 'Registro não encontrado.'}
    // }
    return await Localizacao.query()
                        .where('id', params.id)
                        .preload('vagas')
                        .first()
  }

  async store({request}: HttpContext) {
    const data = request.only(['nome'])
    return await Localizacao.create(data)
  }

  async update({params, request}: HttpContext) {
    const localizacao = await Localizacao.findOrFail(params.id)
    const data = request.only(['nome'])

    try {
      localizacao.merge(data)
      await localizacao.save()
      return {message: 'Registro alterado com sucesso. ', localizacao}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const localizacao = await Localizacao.findOrFail(params.id)
    
    try {
      await localizacao.delete()
      return {message: 'Registro deletado com sucesso. ', localizacao}
    } catch (error) {
      return {message: error}
    }
  }
}