import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

import Imagem from "#models/imagem";
import { normalize } from 'node:path';

export default class ImagemsController {
  async index({request}: HttpContext) {
    const page = request.input('page')
    return await Imagem.query()
                        .paginate(page, 5)
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

  //Upload
  async store({request, response}: HttpContext) {
    const img = request.file('imagem', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg']
    })

    if (!img?.isValid) {
      return response.badRequest({
        errors: img?.errors
      })
    }
    const nome = img.clientName.split('.')[0];
    await img.move(app.makePath('uploads'), {
      name: `${nome}.${img.extname}`
    })
    const data = {
      nome: nome,
      tipo: img.extname,
      imagem: img.clientName
    }
    return await Imagem.create(data)
  }
  // Download
  async show({params, response}: HttpContext) {

    const dados = await Imagem.findOrFail(params.id)
    const nomeImagem = normalize(dados.imagem)

    const caminhoImagem = app.makePath('uploads', nomeImagem)

    return response.download(caminhoImagem)
  }
}