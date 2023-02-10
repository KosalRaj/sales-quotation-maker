import { InferSchemaType, model, Schema } from 'mongoose'

const tabularSpecsSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
      index: true
    },
    manufacturer: String,
    itemModel: {
      type: String,
      index: true
    },
    hasTabularSpecs: {
      type: Boolean,
      default: false,
      required: false
    },
    itemSpecs: {
      type: [tabularSpecsSchema]
    },
    itemProps: [String],
    itemUom: {
      type: String
    },
    unitPrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

itemSchema.pre('save', function (next) {
  if (
    this.hasTabularSpecs === true &&
    (this.itemSpecs.length === 0 || isNaN(this.itemSpecs.length))
  ) {
    next(
      new Error('itemSpecs field is required if hasTabularSpecs field is true')
    )
  } else {
    next()
  }
})

type ItemType = InferSchemaType<typeof itemSchema>

const ItemModel = model<ItemType>('Item', itemSchema)

export { ItemModel }
