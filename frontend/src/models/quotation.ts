export interface ILineItem {
  itemInfo: string
  itemQuantity: number
  _id: string
}

export interface IQuotation {
  _id: string
  quotationId: string
  priceTerm: string
  currency: string
  createdBy: string
  lineItems: ILineItem[]
  createdAt: string
  updatedAt: string
}
