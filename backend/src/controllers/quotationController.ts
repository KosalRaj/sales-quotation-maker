import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { QuotationModel } from '../models/quotation'
import { ItemModel } from '../models/item'
import mongoose from 'mongoose'

/* eslint-disable @typescript-eslint/no-misused-promises */
export const getQuotations: RequestHandler = async (req, res, next) => {
  try {
    const quotations = await QuotationModel.find().exec()
    res.status(200).json(quotations)
  } catch (error) {
    next(error)
  }
}

export const getDetailQuotations: RequestHandler = async (req, res, next) => {
  try {
    const quotations = await QuotationModel.find()
      .populate({
        path: 'lineItems.itemInfo',
        model: ItemModel
      })
      .exec()
    res.status(200).json(quotations)
  } catch (error) {
    next(error)
  }
}

interface CreateQuotationBody {
  quotationId?: string
  priceTerm?: string
  currency?: string
  createdBy?: string
  lineItems?: [
    {
      itemInfo?: string
      itemQuantity?: number
    }
  ]
}

export const createQuotation: RequestHandler<
  unknown,
  unknown,
  CreateQuotationBody,
  unknown
> = async (req, res, next) => {
  const { quotationId, priceTerm, currency, createdBy, lineItems } = req.body

  try {
    if (
      quotationId === null ||
      quotationId === '' ||
      quotationId === undefined
    ) {
      throw createHttpError(400, 'Quotation number is required')
    }

    if (priceTerm === null || priceTerm === '' || priceTerm === undefined) {
      throw createHttpError(400, 'Price term is required')
    }

    if (currency === null || currency === '' || currency === undefined) {
      throw createHttpError(400, 'Currency field is required')
    }

    const lineItemsWithPopulatedItemInfo = []

    if (lineItems !== undefined && lineItems?.length > 0) {
      for await (const { itemInfo, itemQuantity } of lineItems) {
        const populatedItemInfo = await ItemModel.findById(itemInfo).exec()

        lineItemsWithPopulatedItemInfo.push({
          itemInfo: populatedItemInfo,
          itemQuantity
        })
      }
    }

    const newQuotation = await QuotationModel.create({
      quotationId,
      priceTerm,
      currency,
      createdBy,
      lineItems: lineItemsWithPopulatedItemInfo
    })
    res.status(201).json(newQuotation)
  } catch (error) {
    next(error)
  }
}

export const getQuotationById: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError()
    }

    const quotation = await QuotationModel.findById(id).exec()

    if (quotation === null || quotation === undefined) {
      res.status(404).json({ message: 'Item not found' })
    }
    res.json(quotation)
  } catch (error) {
    next(error)
  }
}

export const getQuotationByNumber: RequestHandler = async (req, res, next) => {
  const { quotationId } = req.params

  try {
    if (
      quotationId === null ||
      quotationId === '' ||
      quotationId === undefined
    ) {
      throw createHttpError(400, 'Invalid quotation number')
    }

    const quotation = await QuotationModel.findOne({
      quotationId
    })

    if (quotation === null || quotation === undefined) {
      res.status(404).json({ message: 'Quotation not found' })
    }

    res.json(quotation)
  } catch (error) {
    next(error)
  }
}

interface UpdateQuotationParams {
  id: string
}

interface UpdateQuotationBody {
  priceTerm?: string
  currency?: string
  createdBy?: string
  lineItems?: [
    {
      itemInfo?: string
      itemQuantity?: number
    }
  ]
}

export const updateQuotation: RequestHandler<
  UpdateQuotationParams,
  unknown,
  UpdateQuotationBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid item id')
    }

    if (
      updates.priceTerm === null ||
      updates.priceTerm === '' ||
      updates.priceTerm === undefined
    ) {
      throw createHttpError(400, 'Price term is required')
    }

    if (
      updates.currency === null ||
      updates.currency === '' ||
      updates.currency === undefined
    ) {
      throw createHttpError(400, 'Currency field is required')
    }

    const updatedQuotation = await QuotationModel.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
        populate: {
          path: 'lineItems.itemInfo',
          model: ItemModel
        }
      }
    ).exec()

    if (updatedQuotation === null || updatedQuotation === undefined) {
      throw createHttpError(404, 'Item not found')
    }

    res.status(200).json(updatedQuotation)
  } catch (error) {
    next(error)
  }
}

export const deleteQuotation: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  try {
    const quotation = await QuotationModel.findById(id)
    
    if (quotation === null || quotation === undefined) {
      res.status(404).json({ message: 'Item not found' })
    }

    await quotation?.remove()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const getLatestQuotationId: RequestHandler = async (req, res, next) => {
  try {
    const quotation = await QuotationModel.findOne({}).sort({
      createdAt: -1
    })

    if (quotation === null || quotation === undefined) {
      res.status(404).json({ message: 'Item not found' })
    }

    res.json(quotation)
  } catch (error) {
    next(error)
  }
}

