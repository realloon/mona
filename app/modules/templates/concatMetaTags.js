import { metas } from '../../../mona.config.js'

/**
 * Concatenates meta tags with the given metas and configed metas.
 * @param {object} configMetas - The config metas to be concatenated.
 * @returns {string} - The concatenated meta tags.
 */
export default function concatMetaTags(configMetas) {
  const assignedMetas = Object.assign(metas, configMetas)

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
