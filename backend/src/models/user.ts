import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    passwordDigest: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    role: {
      type: String,
      required: true
    },
    rememberToken: String
  },
  { timestamps: true }
)

type UserType = InferSchemaType<typeof userSchema>

const UserModel = model<UserType>('User', userSchema)

export { UserModel }
