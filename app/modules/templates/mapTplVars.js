import { isString, isObject } from '../validators/baseValidators.js'

/**
 * Maps template variables to their corresponding values in configVariables and customVariables objects.
 * @param {string} template - The template string.
 * @param {Object} configVariables - The configVariables object.
 * @param {Object} customVariables - The customVariables object.
 * @returns {Array} An array of objects representing the mapped template variables.
 * @throws {Error} If template is not a string or if neither configVariables nor customVariables is an object.
 */
export default function mapTplVars(template, configVariables, customVariables) {
  if (!isString(template)) {
    throw new Error('Invalid input: template must be a string')
  }
  if (!isObject(configVariables) && !isObject(customVariables)) {
    throw new Error('Invalid input: At least one object is required.')
  }

  const assignedVars = Object.assign(
    Object.create(null),
    configVariables,
    customVariables
  )

  const reg = /{{ (\w+) }}/g

  // match: {{ (\w+) }}; variable: \w+
  return Array.from(template.matchAll(reg)).map(([match, variable]) => ({
    slot: match,
    value: assignedVars[variable],
  }))
}
