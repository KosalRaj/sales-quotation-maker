import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import { CustomerModel } from '../models/customer'

export const getCustomers: RequestHandler = async (req, res, next) => {
  try {
    const customers = await CustomerModel.find().exec()
    res.status(200).json(customers)
  } catch (error) {
    next(error)
  }
}

interface CreateCustomerBody {
  name?: string
  address?: string
  email?: string
  contact?: number
  contactPerson?: string
  sameBilling?: boolean
  billingAddress?: string
}

export const createCustomer: RequestHandler<
  unknown,
  unknown,
  CreateCustomerBody,
  unknown
> = async (req, res, next) => {
  const {
    name,
    address,
    email,
    contact,
    contactPerson,
    sameBilling,
    billingAddress
  } = req.body

  try {
    if (name === null || name === '' || name === undefined) {
      throw createHttpError(400, 'Customer Name Required')
    }

    if (address === null || address === '' || address === undefined) {
      throw createHttpError(400, 'Customer Address Required')
    }

    if (email === null || email === '' || email === undefined) {
      throw createHttpError(400, 'Customer Email Required')
    }

    if (Number.isNaN(contact)) {
      throw createHttpError(
        400,
        'Customer contact number is Required and should be number'
      )
    }

    if (
      contactPerson === null ||
      contactPerson === '' ||
      contactPerson === undefined
    ) {
      throw createHttpError(400, 'Customer contact person person is required')
    }

    if (
      sameBilling === false &&
      (billingAddress === null ||
        billingAddress === '' ||
        billingAddress === undefined)
    ) {
      throw createHttpError(400, 'Billing address required if not same as physical address')
    }

    const customer = await CustomerModel.create({
      name,
      address,
      email,
      contact,
      contactPerson,
      sameBilling,
      billingAddress
    })

    res.status(201).json(customer)
  } catch (error) {
    next(error)
  }
}

export const getCustomerById: RequestHandler = async (req, res, next) => {
  const {
    params: { id }
  } = req

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid customer id.')
    }

    const customer = await CustomerModel.findById(id)

    if (customer === null || customer === undefined) {
      throw createHttpError(404, 'Customer not found')
    } else {
      res.status(200).json(customer)
    }
  } catch (error) {
    next(error)
  }
}

interface UpdateCustomerParams {
  id: string
}

interface UpdateCustomerBody {
  name?: string
  address?: string
  email?: string
  contact?: number
  contactPerson?: string
  sameBilling?: boolean
  billingAddress?: string
}

export const updateCustomer: RequestHandler<
  UpdateCustomerParams,
  unknown,
  UpdateCustomerBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid customer id.')
    }

    if (
      updates.name === null ||
      updates.name === '' ||
      updates.name === undefined
    ) {
      throw createHttpError(400, 'Customer name is required.')
    }

    if (
      updates.address === null ||
      updates.address === '' ||
      updates.address === undefined
    ) {
      throw createHttpError(400, 'Customer Address Required')
    }

    if (
      updates.email === null ||
      updates.email === '' ||
      updates.email === undefined
    ) {
      throw createHttpError(400, 'Customer Email Required')
    }

    if (Number.isNaN(updates.contact)) {
      throw createHttpError(
        400,
        'Customer contact number is Required and should be number'
      )
    }

    if (
      updates.contactPerson === null ||
      updates.contactPerson === '' ||
      updates.contactPerson === undefined
    ) {
      throw createHttpError(400, 'Customer contact person person is required')
    }
    const customer = await CustomerModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).exec()

    if (customer === null || customer === undefined) {
      throw createHttpError(404, 'Customer not found.')
    }

    res.status(200).json(customer)
  } catch (error) {
    next(error)
  }
}

export const deleteCustomer: RequestHandler = async (req, res, next) => {
  const { id } = req.params

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, 'Invalid customer id.')
    }

    const customer = await CustomerModel.findById(id).exec()

    if (customer === null || customer === undefined) {
      throw createHttpError(404, 'Customer not found')
    }

    await customer.remove()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export const getCustomerByName: RequestHandler = async (req, res, next) => {
  const { name } = req.params

  try {
    const customer = await CustomerModel.findOne({ name })

    if (customer === null || customer === undefined) {
      throw createHttpError(404, 'Customer not found')
    }

    res.status(200).json(customer)
  } catch (error) {
    next(error)
  }
}

export const findManyCustomerByName: RequestHandler = async (
  req,
  res,
  next
) => {
  const { query } = req.params

  try {
    const customers = await CustomerModel.find({
      name: {
        $regex: new RegExp(query, 'i')
      }
    }).exec()

    if (customers === null || customers === undefined) {
      throw createHttpError(404, 'Matches not found')
    }

    res.status(200).json(customers)
  } catch (error) {
    next(error)
  }
}
