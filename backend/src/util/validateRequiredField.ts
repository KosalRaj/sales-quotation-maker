import createHttpError from 'http-errors'

export default function validateRequiredField(
  field: any,
  errorMessage: string
): void {
  if (!field || field === '') {
    throw createHttpError(400, errorMessage)
  }
}
