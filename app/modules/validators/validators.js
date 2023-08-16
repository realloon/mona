export const isNumber = val => typeof val === 'number'

export const isBoolean = val => typeof val === 'boolean'

export const isUndefined = val => typeof val === 'undefined'

export const isString = val => typeof val === 'string'

export const isObject = val => val instanceof Object && !Array.isArray(val)

export const isStringArray = arr =>
  Array.isArray(arr) && arr.every(e => isString(e))
