import type { HttpContext } from '@adonisjs/core/http'

import Bloco from "#models/bloco";

export default class BlocosController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await Bloco.query()
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    // try {
    //   return await Bloco.findOrFail(params.id)
    // } catch (error) {
    //   return {message: 'Registro não encontrado.'}
    // }
    return await Bloco.query()
                        .where('id', params.id)
                        .preload('apartamentos')
                        .first()
  }

  async store({request}: HttpContext) {
    const data = request.only(['nome', 'descricao'])
    return await Bloco.create(data)
  }

  async update({params, request}: HttpContext) {
    const bloco = await Bloco.findOrFail(params.id)
    const data = request.only(['nome', 'descricao'])

    try {
      bloco.merge(data)
      await bloco.save()
      return {message: 'Registro alterado com sucesso. ', bloco}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const bloco = await Bloco.findOrFail(params.id)
    
    try {
      await bloco.delete()
      return {message: 'Registro deletado com sucesso. ', bloco}
    } catch (error) {
      return {message: error}
    }
  }
}