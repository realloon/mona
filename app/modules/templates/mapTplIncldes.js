import getFileDetails from '../utils/getFileDetails.js'

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
