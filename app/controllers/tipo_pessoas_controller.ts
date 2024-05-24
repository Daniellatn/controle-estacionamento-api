import type { HttpContext } from '@adonisjs/core/http'

import TipoPessoa from "#models/tipo_pessoa";

export default class TipoPessoasController {
  // async index() {
  //   return await TipoPessoa.all()
  // }

  // Preload para relacionamentos
  // return await TipoPessoa.query()
  //                       .preload('type')
  //                       .preload('ingredients')
  //                       .paginate(page, 5)

  async index({request}: HttpContext) {
    const page = request.input('page')
    return await TipoPessoa.query()
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    try {
      return await TipoPessoa.findOrFail(params.id)
    } catch (error) {
      return {message: 'Registro não encontrado.'}
    }
    // return await TipoPessoa.query()
    //                     .where('id', params.id)
    //                     .preload('type')
    //                     .preload('ingredients')
    //                     .first()
  }

  async store({request}: HttpContext) {
    const data = request.only(['nome'])
    return await TipoPessoa.create(data)
  }

  async update({params, request}: HttpContext) {
    const tipoPessoa = await TipoPessoa.findOrFail(params.id)
    const data = request.only(['nome'])

    try {
      tipoPessoa.merge(data)
      await tipoPessoa.save()
      return {message: 'Registro alterado com sucesso. ', tipoPessoa}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const tipoPessoa = await TipoPessoa.findOrFail(params.id)
    
    try {
      await tipoPessoa.delete()
      return {message: 'Registro deletado com sucesso. ', tipoPessoa}
    } catch (error) {
      return {message: error}
    }
  }
}