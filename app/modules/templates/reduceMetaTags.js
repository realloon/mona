import { isObject } from '../validators/baseValidators.js'

/**
 * Reduces and concatenates meta tags from configMetas and customMetas objects.
 * @param {Object} configMetas - The configMetas object.
 * @param {Object} customMetas - The customMetas object.
 * @returns {string} The concatenated meta tags.
 * @throws {Error} If neither configMetas nor customMetas is an object.
 */
export default function reduceMetaTags(configMetas, customMetas) {
  if (!isObject(configMetas) && !isObject(customMetas)) {
    throw Error('At least one meta object must be passed in.')
  }

  const assignedMetas = Object.assign(
    Object.create(null),
    configMetas,
    customMetas
  )

  // title handled separately.
  const titleTag = assignedMetas.title
    ? `<title>${assignedMetas.title}</title>`
    : ''

  const metaTags = Object.entries(assignedMetas)
    .filter(([name]) => name !== 'title') // Already handled separately.
    .reduce((pre, [name, content]) => {
      return `${pre}<meta name="${name}" content="${content}" />`
    }, '')

  return titleTag + metaTags
}
