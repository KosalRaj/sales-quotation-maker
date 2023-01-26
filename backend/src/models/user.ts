import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    role: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

type UserType = InferSchemaType<typeof userSchema>

const UserModel = model<UserType>('User', userSchema)

export { UserModel }
