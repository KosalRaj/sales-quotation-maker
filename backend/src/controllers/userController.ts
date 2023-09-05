import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import validateRequiredField from '../util/validateRequiredField'
import generateToken from '../util/generateToken'
import { UserModel } from '../models/user'
import bcrypt from 'bcrypt'

// export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
//   try {
//     const user = await UserModel.findById(req.session.userId)
//       .select('+email')
//       .exec()
//     res.status(200).json(user)
//   } catch (error) {
//     next(error)
//   }
// }

interface SignUpBody {
  username?: string
  firstname?: string
  lastname?: string
  role?: string
  passwordRaw?: string
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  // const username = req.body.username
  // const email = req.body.email
  // const passwordRaw = req.body.password

  const { username, firstname, lastname, passwordRaw, role } = req.body
  try {
    if (!username || !firstname || !lastname || role || !passwordRaw) {
      throw createHttpError(400, 'Parameters missing')
    }

    const userExists = await UserModel.findOne({
      username: username
    }).exec()

    if (userExists) {
      throw createHttpError(
        409,
        'Username already taken. Please choose a different one or log in instead.'
      )
    }

    const user = await UserModel.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      role: role,
      password: passwordRaw
    })

    if (user) {
      generateToken(res, user._id)

      res.status(201).json({
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      })
    } else {
      res.status(400)
      throw createHttpError(400, 'Invalid user data')
    }

    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

interface LoginBody {
  username?: string
  password?: string
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  try {
    if (!username || !password) {
      throw createHttpError(400, 'Parameters missing')
    }

    const user = await UserModel.findOne({ username: username })
      .select('+password +email')
      .exec()

    if (!user) {
      throw createHttpError(401, 'Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials')
    }

    req.session.userId = user._id
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error)
    } else {
      res.sendStatus(200)
    }
  })
}
