import { data } from '../../../mona.config.js'
import validateMapTplVarsArgs from '../validators/validateMapTplVarsArgs.js'

/**
 * @typedef {object} SlotObject
 * @property {string} slot
 * @property {string} value
 */

/**
 * Map template variables
 * @param {string} template - Template string with variables.
 * @param {object} variables - Contains variables and their values.
 * @returns {Array<SlotObject>} - Replaced variable array with variable names and values.
 */
export default function mapTplVars(template, variables) {
  const { assignedVars } = validateMapTplVarsArgs(template, variables, data)

  const reg = /{{ (\w+) }}/g

  // match: {{ (\w+) }}; variable: \w+
  return Array.from(template.matchAll(reg)).map(([match, variable]) => ({
    slot: match,
    value: assignedVars[variable],
  }))
}
