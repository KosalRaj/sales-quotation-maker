import express from 'express'
import * as CustomerController from '../controllers/customerController'

const router = express.Router()

router.post('/', CustomerController.createCustomer)

router.get('/', CustomerController.getCustomers)

router.get('/:id', CustomerController.getCustomerById)

router.get('/name/:itemName', CustomerController.getCustomerByName)

router.get('/find/:query', CustomerController.findManyCustomerByName)

router.patch('/:id', CustomerController.updateCustomer)

router.delete('/:id', CustomerController.deleteCustomer)

export default router
