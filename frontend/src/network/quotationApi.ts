import { IItem } from '../models/lineItem'
import { ILineItem, IQuotation } from '../models/quotation'

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init)

  if (response.ok) {
    return response
  } else {
    const errorBody = await response.json()
    const errorMessage = errorBody.console.error()
    throw Error(errorMessage)
  }
}

export async function fetchQuotations(): Promise<IQuotation[]> {
  const response = await fetchData('/proxy/api/quotations/all', {
    method: 'GET'
  })

  return response.json()
}

export async function fetchLastQuotation(): Promise<IQuotation> {
  const response = await fetchData('/proxy/api/quotations/latest', {
    method: 'GET'
  })

  return response.json()
}

export interface IQuotationInput {
  quotationId: string
  priceTerm: string
  currency: string
  createdBy: string
  lineItems: ILineItem[]
  createdAt: string
  updatedAt: string
}

export async function createQuotation(quotation: IQuotationInput): Promise<IQuotation> {
  const response = await fetchData('/proxy/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quotation)
  })

  return response.json()
}
