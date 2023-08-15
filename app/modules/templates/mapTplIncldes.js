import getFileDetails from '../utils/getFileDetails.js'

/**
 * Maps template includes to their corresponding file content.
 * @param {String} template - The template string.
 * @param {RegExp} regexp - The match regexp.
 * @returns {Promise<Array>} A promise that resolves to an array of objects representing the mapped template includes.
 * @throws {Error} If there is an error while retrieving file details.
 */
export default async function mapTplIncldes(template, regexp) {
  return await Promise.all(
    Array.from(template.matchAll(regexp)).map(async ([match, include]) => {
      const { content } = await getFileDetails(`./src/includes/${include}.html`)
      return {
        slot: match,
        value: content,
      }
    })
  )
}
