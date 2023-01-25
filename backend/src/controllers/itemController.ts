import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import { ItemModel } from '../models/item'

/* eslint-disable @typescript-eslint/no-misused-promises */
export const getItems: RequestHandler = async (req, res, next) => {
  try {
    const items = await ItemModel.find().exec()
    res.status(200).json(items)
  } catch (error) {
    next(error)
  }
}

interface CreateItemBody {
  itemName?: string
  manufacturer?: string
  itemModel?: string
  hasTabularSpecs?: boolean
  itemSpecs?: [
    {
      key: string
      value: string
    }
  ]
  itemProps?: [string]
  itemUom?: string
  unitPrice?: number
}

export const createItem: RequestHandler<
  unknown,
  unknown,
  CreateItemBody,
  unknown
> = async (req, res, next) => {
  const {
    itemName,
    manufacturer,
    itemModel,
    hasTabularSpecs,
    itemSpecs,
    itemProps,
    itemUom,
    unitPrice
  } = req.body

  try {
    if (itemName === null || itemName === '' || itemName === undefined) {
      throw createHttpError(400, 'Item name required.')
    }

    if (Number.isNaN(unitPrice)) {
      throw createHttpError(400, 'Price of item is missing or of invalid type.')
    }

    if (itemUom === null || itemUom === '' || itemUom === undefined) {
      throw createHttpError(400, 'Unit of measure(UOM) required.')
    }

    const item = await ItemModel.create({
      itemName,
      manufacturer,
      itemModel,
      hasTabularSpecs,
      itemSpecs,
      itemProps,
      itemUom,
      unitPrice
    })
    res.status(201).json(item)
  } catch (error) {
    next(error)
  }
}

export const getItemById: RequestHandler = async (req, res, next) => {
  const {
    params: { id }
  } = req

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid item id.')
    }

    const item = await ItemModel.findById(id)

    if (item === null || item === undefined) {
      throw createHttpError(404, 'Item not found')
    } else {
      res.status(200).json(item)
    }
  } catch (error) {
    next(error)
  }
}

interface UpdateItemParams {
  id: string
}

interface UpdateItemBody {
  itemName?: string
  manufacturer?: string
  itemModel?: string
  hasTabularSpecs?: boolean
  itemSpecs?: [
    {
      key: string
      value: string
    }
  ]
  itemProps?: [string]
  itemUom?: string
  unitPrice?: number
}

export const updateItem: RequestHandler<
  UpdateItemParams,
  unknown,
  UpdateItemBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid item id.')
    }

    if (
      updates.itemName === null ||
      updates.itemName === '' ||
      updates.itemName === undefined
    ) {
      throw createHttpError(400, 'Item name is required.')
    }

    if (Number.isNaN(updates.unitPrice)) {
      throw createHttpError(400, 'Item price is required.')
    }

    if (
      updates.itemUom === null ||
      updates.itemUom === '' ||
      updates.itemUom === undefined
    ) {
      throw createHttpError(400, 'Unit of measure(UOM) is required.')
    }

    const item = await ItemModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).exec()

    if (item === null || item === undefined) {
      throw createHttpError(404, 'Item not found.')
    }

    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
}

export const deleteItem: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid item id.')
    }

    const item = await ItemModel.findById(id).exec()

    if (item === null || item === undefined) {
      throw createHttpError(404, 'Item not found')
    }

    await item.remove()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const getItemByModel: RequestHandler = async (req, res, next) => {
  const { model } = req.params

  try {
    if (model === null || model === undefined) {
      throw createHttpError(400, 'Invalid model number')
    }

    const item = await ItemModel.findOne({ itemModel: model.toUpperCase() })

    if (item === null || item === undefined) {
      throw createHttpError(404, 'Item not found')
    }

    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
}

export const getItemByItemName: RequestHandler = async (req, res, next) => {
  const { itemName } = req.params

  try {
    const item = await ItemModel.findOne({ itemName })

    if (item === null || item === undefined) {
      throw createHttpError(404, 'Item not found')
    }

    res.status(200).json(item)
  } catch (error) {
    next(error)
  }
}

export const findManyByName: RequestHandler = async (req, res, next) => {
  const { query } = req.params

  try {
    const items = await ItemModel.find({
      itemName: {
        $regex: new RegExp(query, 'i')
      }
    }).exec()

    if (items === null || items === undefined) {
      throw createHttpError(404, 'Matches not found')
    }

    res.status(200).json(items)
  } catch (error) {
    next(error)
  }
}
