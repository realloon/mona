import { marked } from 'marked'
import getFileDetails from '../utils/getFileDetails.js'

export default async function getPostDetails(path) {
  const files = await getFileDetails(path)

  return files.map(({ content: rawCtx, fileName, modifiedTime }) => {
    const title = fileName.slice(0, -14)
    const content = marked(rawCtx)
    const publicTime = fileName.slice(-13, -3)
    const href = encodeURI(`/blog/${title}.html`)
    const metas = extractMetas(rawCtx)

    return {
      title,
      content,
      publicTime,
      modifiedTime,
      href,
      metas,
    }
  })
}

function extractMetas(content) {
  const lines = content.split('\n').map(line => line.trim())
  const start = lines.indexOf('---')
  const end = lines.indexOf('---', start + 1)

  if (start === -1 || end === -1) return null

  const metas = Object.create(null)

  lines
    .slice(start + 1, end)
    .map(line => line.match(/(.*?):\s(.*)/)) // TODO: can still be further optimized.
    .forEach(([_, key, val]) => (metas[key] = val))

  return metas
}
