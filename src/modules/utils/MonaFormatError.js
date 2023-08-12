export default class MonaFormatError {
  constructor({ message, target = null }) {
    const error = Error(message)
    error.name = 'MonaFormatError'
    error.target = target
    return error
  }
}
