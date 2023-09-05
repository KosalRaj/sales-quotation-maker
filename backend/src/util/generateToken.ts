import jwt from 'jsonwebtoken'
import { Response } from 'express'
import env from './validateEnv'
import { ObjectId } from 'mongoose'

const generateToken = (res: Response, userId: ObjectId): void => {
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  })
}

export default generateToken