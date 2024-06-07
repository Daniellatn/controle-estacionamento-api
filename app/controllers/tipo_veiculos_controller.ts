import type { HttpContext } from '@adonisjs/core/http'

import TipoVeiculo from "#models/tipo_veiculo";

export default class TipoVeiculosController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await TipoVeiculo.query()
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    // try {
    //   return await TipoVeiculo.findOrFail(params.id)
    // } catch (error) {
    //   return {message: 'Registro não encontrado.'}
    // }
    return await TipoVeiculo.query()
                        .where('id', params.id)
                        .preload('veiculos')
                        .first()
  }

  async store({request}: HttpContext) {
    const data = request.only(['nome'])
    return await TipoVeiculo.create(data)
  }

  async update({params, request}: HttpContext) {
    const tipoVeiculo = await TipoVeiculo.findOrFail(params.id)
    const data = request.only(['nome'])

    try {
      tipoVeiculo.merge(data)
      await tipoVeiculo.save()
      return {message: 'Registro alterado com sucesso. ', tipoVeiculo}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const tipoVeiculo = await TipoVeiculo.findOrFail(params.id)
    
    try {
      await tipoVeiculo.delete()
      return {message: 'Registro deletado com sucesso. ', tipoVeiculo}
    } catch (error) {
      return {message: error}
    }
  }
}