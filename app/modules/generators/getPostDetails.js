import { basename, extname } from 'path'
import { marked } from 'marked'
import getFileDetails from '../utils/getFileDetails.js'

/**
 * Retrieves details of the blog posts from source files.
 * @param {string} path - The path to the folder containing the source files for the blog posts. Default is "./src/posts".
 * @returns {Promise<Object[]>} - A Promise that resolves to an array of blog post details.
 */
export default async function getPostDetails(path = './src/posts') {
  const files = await getFileDetails(path)

  return files.map(({ content: rawCtx, fileName, modifiedTime }) => {
    const title = basename(fileName, extname(fileName))
    const href = encodeURI(`/blog/${title}.html`)
    const { html: content, metas } = parseContent(rawCtx)

    return {
      title,
      content,
      modifiedTime,
      href,
      metas,
    }
  })
}

/**
 * Parses the content of a blog post to extract the metadata and convert the markdown content to HTML.
 * @param {string} content - The content of the blog post.
 * @returns {Object} - An object containing the HTML content and metadata of the blog post.
 */
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
