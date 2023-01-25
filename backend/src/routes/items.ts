import express from 'express'
import * as ItemsController from '../controllers/itemController'

const router = express.Router()

router.post('/', ItemsController.createItem)

router.get('/', ItemsController.getItems)

router.get('/:id', ItemsController.getItemById)

router.get('/model/:model', ItemsController.getItemByModel)

router.get('/name/:itemName', ItemsController.getItemByItemName)

router.get('/find/:query', ItemsController.findManyByName)

router.patch('/:id', ItemsController.updateItem)

router.delete('/:id', ItemsController.deleteItem)

export default router
