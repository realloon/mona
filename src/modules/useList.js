import getPosts from './getPosts.js'

export default async function useList(template) {
  const posts = await getPosts()

  const content =
    posts.reduce(
      (pre, cur) =>
        pre +
        `<li><a href="${cur.href}">${cur.heading}</a><time>${cur.date}</time></li>`,
      '<ul>'
    ) + '</ul>'

  return template.replace('{{ use list }}', content)
}
