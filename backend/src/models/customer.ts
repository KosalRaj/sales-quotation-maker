import { InferSchemaType, model, Schema } from 'mongoose'

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    contact: {
      type: Number,
      required: true
    },
    contactPerson: String,
    sameBilling: {
      type: Boolean,
      default: false
    },
    billingAddress: String
  },
  { timestamps: true }
)

customerSchema.pre('save', function (next) {
  if (this.sameBilling === true) {
    this.billingAddress = this.address
  }
  next()
})

type CustomerType = InferSchemaType<typeof customerSchema>

const CustomerModel = model<CustomerType>('Customer', customerSchema)

export { CustomerModel }
