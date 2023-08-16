import getPostDetails from '../generators/getPostDetails.js'

/**
 * Reduces the list of blog post tags into HTML format.
 * @returns {Promise<string>} - A Promise that resolves to the HTML string of the reduced list of blog post tags.
 */
export default async function reduceListTags() {
  const posts = await getPostDetails()

  const r = posts.reduce((pre, cur) => {
    const { title, metas } = cur
    debugger
    return `${pre}<li><a href="/blog/${title}.html">${metas.title}</a><time>${metas.date}</time></li>`
  }, '<ul>')

  return r + '</ul>'
}
