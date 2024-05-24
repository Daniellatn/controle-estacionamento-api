/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ApartamentosController from '#controllers/apartamentos_controller'
import BlocosController from '#controllers/blocos_controller'
import ImagemsController from '#controllers/imagems_controller'
import LocalizacaosController from '#controllers/localizacaos_controller'
import PessoasController from '#controllers/pessoas_controller'
import TipoPessoasController from '#controllers/tipo_pessoas_controller'
import TipoVeiculosController from '#controllers/tipo_veiculos_controller'
import VagasController from '#controllers/vagas_controller'
import VeiculosController from '#controllers/veiculos_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('/tipo-pessoas', TipoPessoasController).apiOnly()
router.resource('/blocos', BlocosController).apiOnly()
router.resource('/localizacoes', LocalizacaosController).apiOnly()
router.resource('/tipo-veiculos', TipoVeiculosController).apiOnly()
router.resource('/imagens', ImagemsController).apiOnly()
router.resource('/pessoas', PessoasController).apiOnly()
router.resource('/apartamentos', ApartamentosController).apiOnly()
router.resource('/vagas', VagasController).apiOnly()
router.resource('/veiculos', VeiculosController).apiOnly()
