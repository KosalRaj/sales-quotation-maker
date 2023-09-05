import { ICustomer } from '../models/customer'

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

export async function fetchCustomersList(): Promise<ICustomer[]> {
  const response = await fetchData('/proxy/api/customers', {
    method: 'GET'
  })

  return response.json()
}

export interface ICustomerInput {
  name: string
  address?: string
  email?: string
  contact?: number
  contactPerson?: string
  sameBilling?: boolean
  billingAddress?: string
}

export async function addCustomer(
  customer: ICustomerInput
): Promise<ICustomer> {
  const response = await fetchData('/proxy/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  })

  return response.json()
}

export async function updateCustomer(
  customerId: string,
  customer: ICustomerInput
): Promise<ICustomer> {
  const response = await fetchData('proxy/api/customers/' + customerId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  })

  return response.json()
}

export async function deleteCustomer(customerId: string) {
  await fetchData('/proxy/api/customers/' + customerId, { method: 'DELETE' })
}
