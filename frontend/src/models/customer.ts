export interface ICustomer {
  _id: string
  name: string
  address?: string
  email?: string
  contact?: number
  contactPerson?: string
  sameBilling?: boolean
  billingAddress?: string
}
