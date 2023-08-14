export const isNumber = value => typeof value === 'number'

export const isBoolean = value => typeof value === 'boolean'

export const isUndefined = value => typeof value === 'undefined'

export const isString = value => typeof value === 'string'

export const isObject = value =>
  value instanceof Object && !Array.isArray(value)

export const isStringArray = arr =>
  Array.isArray(arr) && arr.every(e => isString(e))
