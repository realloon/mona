import fs from 'fs/promises'

export default async function reduceListTags(path) {
  const filenames = await fs.readdir(path)

  const r = filenames.reduce((pre, cur) => {
    const title = cur.slice(0, -14)
    const time = cur.slice(-13, -3)
    return `${pre}<li><a href="/blog/${title}.html">${title}</a><time>${time}</time></li>`
  }, '<ul>')

  return r + '<ul/>'
}
