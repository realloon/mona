import { marked } from 'marked'
import getFileDetails from '../utils/getFileDetails.js'

export default async function getPostDetails(path = './src/posts') {
  const files = await getFileDetails(path)

  return files.map(({ content: rawCtx, fileName, modifiedTime }) => {
    const title = fileName.slice(0, -14)
    const publicTime = fileName.slice(-13, -3)
    const href = encodeURI(`/blog/${title}.html`)
    const { html: content, metas } = parseContent(rawCtx)

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

function parseContent(content) {
  const lines = content.trim().split('\n')
  const start = lines.findIndex(line => line.trim() === '---')

  if (start === -1) {
    return {
      html: marked(content),
      metas: null,
    }
  }

  const end = lines.findIndex(
    (line, index) => index > start && line.trim() === '---'
  )

  const metas = Object.create(null)

  lines
    .slice(start + 1, end)
    .map(line => line.match(/(.*?):\s(.*)/))
    .forEach(([_, key, val]) => (metas[key] = val))

  const markdownContent = lines.slice(end + 1).join('\n')
  const htmlContent = marked(markdownContent)

  return {
    html: htmlContent,
    metas: metas,
  }
}
