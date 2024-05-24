import type { HttpContext } from '@adonisjs/core/http'

import Veiculo from "#models/veiculo";

export default class VeiculosController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await Veiculo.query()
                        .paginate(page, 5)
  }

  async show({params}: HttpContext) {
    try {
      return await Veiculo.findOrFail(params.id)
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
    const data = request.only(['placa', 'cor', 'tipoVeiculoId', 'apartamentoId', 'imagemId'])
    return await Veiculo.create(data)
  }

  async update({params, request}: HttpContext) {
    const veiculo = await Veiculo.findOrFail(params.id)
    const data = request.only(['placa', 'cor', 'tipoVeiculoId', 'apartamentoId', 'imagemId'])

    try {
      veiculo.merge(data)
      await veiculo.save()
      return {message: 'Registro alterado com sucesso. ', veiculo}
    } catch (error) {
      return {message: error}
    }
  }

  async destroy({params}: HttpContext) {
    const veiculo = await Veiculo.findOrFail(params.id)
    
    try {
      await veiculo.delete()
      return {message: 'Registro deletado com sucesso. ', veiculo}
    } catch (error) {
      return {message: error}
    }
  }
}