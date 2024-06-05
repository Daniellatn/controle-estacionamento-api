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

  // async show({params}: HttpContext) {
  //   try {
  //     return await Imagem.findOrFail(params.id)
  //   } catch (error) {
  //     return {message: 'Registro não encontrado.'}
  //   }
  //   // return await Bloco.query()
  //   //                     .where('id', params.id)
  //   //                     .preload('type')
  //   //                     .preload('ingredients')
  //   //                     .first()
  // }

  // async store({request}: HttpContext) {
  //   const data = request.only(['nome', 'tipo', 'imagem'])
  //   return await Imagem.create(data)
  // }

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
    console.log('RRR: ', request)
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
    console.log('DDD: ', data)
    return await Imagem.create(data)
  }
  // Download
  async show({params, response}: HttpContext) {
    const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

    const dados = await Imagem.findOrFail(params.id)
    const nomeImagem = normalize(dados.imagem)

    if (PATH_TRAVERSAL_REGEX.test(nomeImagem)) {
      return response.badRequest('Caminho incorreto.')
    }

    const caminhoImagem = app.makePath('uploads', nomeImagem)

    return response.download(caminhoImagem)
  }
}