import type { HttpContext } from '@adonisjs/core/http'

import Imagem from "#models/imagem";

export default class ImagemsController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await Imagem.query()
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    try {
      return await Imagem.findOrFail(params.id)
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
    const data = request.only(['nome', 'tipo', 'imagem'])
    return await Imagem.create(data)
  }

  async update({params, request}: HttpContext) {
    const imagem = await Imagem.findOrFail(params.id)
    const data = request.only(['nome', 'tipo', 'imagem'])

    try {
      imagem.merge(data)
      await imagem.save()
      return {message: 'Registro alterado com sucesso. ', imagem}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const imagem = await Imagem.findOrFail(params.id)
    
    try {
      await imagem.delete()
      return {message: 'Registro deletado com sucesso. ', imagem}
    } catch (error) {
      return {message: error}
    }
  }
}