import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import quotationsRoutes from './routes/quotations'
import itemsRoutes from './routes/items'
import morgan from 'morgan'
import createHttpError, { isHttpError } from 'http-errors'

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/quotations', quotationsRoutes)
app.use('/api/items', itemsRoutes)

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  let errorMessage = 'An unknown error occured'
  let statusCode = 500

  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({ error: errorMessage })
})

export default app
