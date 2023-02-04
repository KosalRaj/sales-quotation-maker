import { IItem } from "../models/lineItem"

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init)

  if (response.ok) {
    return response
  } else {
    const errorBody = await response.json()
    const errorMessage= errorBody.console.error()
    throw Error(errorMessage)
  }
}

export async function fetchItems(): Promise<IItem[]> {
  const response = await fetchData('/proxy/api/items', {
    method: 'GET'
  })
  
  return response.json()
}

export interface IItemInput {
  itemName: string
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

export async function createItem(item: IItemInput): Promise<IItem> {
  const response = await fetchData('/proxy/api/items', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(item)
  })
  
  return response.json()
}

export async function deleteItem(itemId: string) {
  await fetchData('/proxy/items/' + itemId, { method: "DELETE" })
}