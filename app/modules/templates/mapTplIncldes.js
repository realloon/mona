import getFileDetails from '../utils/getFileDetails.js'

/**
 * Maps template includes to their corresponding file content.
 * @param {string} template - The template string.
 * @returns {Promise<Array>} A promise that resolves to an array of objects representing the mapped template includes.
 * @throws {Error} If there is an error while retrieving file details.
 */
export default async function mapTplIncldes(template) {
  const reg = /{{ include "(\w+?)" }}/g

  return await Promise.all(
    Array.from(template.matchAll(reg)).map(async ([match, include]) => {
      const { content } = await getFileDetails(`./src/includes/${include}.html`)
      return {
        slot: match,
        value: content,
      }
    })
  )
}
