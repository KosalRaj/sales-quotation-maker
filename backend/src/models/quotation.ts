import { InferSchemaType, model, Schema } from 'mongoose'

const quotationSchema = new Schema(
  {
    quotationId: {
      type: String,
      index: true,
      required: true
    },
    priceTerm: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    },
    lineItems: [
      {
        itemInfo: {
          type: Schema.Types.ObjectId,
          ref: 'ItemModel'
        },
        itemQuantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
)

// type Quotation = InferSchemaType<typeof quotationSchema>

// export default model<Quotation>('Quotation', quotationSchema)

type QuotationType = InferSchemaType<typeof quotationSchema>

const QuotationModel = model<QuotationType>('Quotation', quotationSchema)

export { QuotationModel }
