import { isString, isUndefined } from '../validators/baseValidators.js'

export default function validateMapTplVarsArgs(template, variables, data) {
  if (!isString(template)) {
    throw new Error('Invalid input: template must be a string')
  }

  const assignedVars = isUndefined(data)
    ? variables
    : Object.assign(data, variables)

  if (isUndefined(assignedVars)) {
    throw new Error('Invalid input: variables must be defined')
  }

  return { assignedVars }
}
