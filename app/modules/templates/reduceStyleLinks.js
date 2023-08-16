import { isStringArray } from '../validators/validators.js'

/**
 * Concatenates an array of style links into a single string.
 * @param {string[]} styles - An array of style links.
 * @returns {string} The concatenated style links.
 * @throws {Error} If an array of strings is not passed in.
 */
export default function concatStyleLinks(styles) {
  if (!isStringArray(styles)) {
    throw new Error('Invalid input: An array of strings must be passed in.')
  }

  return styles.reduce(
    (pre, cur) => `${pre}<link rel="stylesheet" href="${cur}" />`,
    ''
  )
}
