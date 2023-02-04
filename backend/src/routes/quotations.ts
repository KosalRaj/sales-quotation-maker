import express from 'express'
import * as QuotationsController from '../controllers/quotationController'

const router = express.Router()

router.get('/', QuotationsController.getQuotations)

router.get('/all', QuotationsController.getDetailQuotations)

router.get('/latest', QuotationsController.getLatestQuotationId)

router.post('/', QuotationsController.createQuotation)

router.get('/:id', QuotationsController.getQuotationById)

router.get('/number/:quotationId', QuotationsController.getQuotationByNumber)

router.patch('/:id', QuotationsController.updateQuotation)

router.delete('/:id', QuotationsController.deleteQuotation)

export default router
