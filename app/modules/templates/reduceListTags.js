import getPostDetails from '../generators/getPostDetails.js'

export default async function reduceListTags() {
  const posts = await getPostDetails()

  const r = posts.reduce((pre, cur) => {
    const { title, metas } = cur
    return `${pre}<li><a href="/blog/${title}.html">${metas.title}</a><time>${metas.date}</time></li>`
  }, '<ul>')

  return r + '</ul>'
}
