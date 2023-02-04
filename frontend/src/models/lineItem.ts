export interface ITabularSpecs {
  _id: string
  key: string
  value: unknown
}

export interface IItem {
  _id: string
  itemName: string
  manufacturer?: string
  itemModel?: string
  hasTabularSpecs?: boolean
  itemSpecs?: ITabularSpecs[]
  itemProps?: string[]
  itemUom: string
  unitPrice: number
  createdAt: string
  updatedAt: string
  __v: number
}
