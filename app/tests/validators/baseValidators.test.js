import {
  isString,
  isBoolean,
  isNumber,
  isUndefined,
} from '../../modules/validators/baseValidators.js'

console.log(isString('hello'))

console.log(isString(100))

console.log(isString())

console.log(isBoolean(true))

console.log(isBoolean(100))

console.log(isBoolean())

console.log(isNumber('100'))

console.log(isNumber(100))

console.log(isNumber())

console.log(isUndefined(''))

console.log(isUndefined({}.attr))

console.log(isUndefined())

console.log(isUndefined(undefined))
