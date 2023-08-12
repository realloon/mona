import path from 'path'
import fs from 'fs/promises'
// external modules
import { marked } from 'marked'
// my module
import { root } from '../../mona.config.js'
import getPosts from './getPosts.js'
import useMeat from './useMeat.js'
import useStyle from './useStyle.js'
import useIncludes from './useIncludes.js'
import useVar from './useVar.js'

export default async function getTransedPosts() {
  // 读取推文模板
  const postTemplate = (
    await fs.readFile(path.join(root, './src/layouts/post.html'))
  ).toString()

  // 获取文章
  const originPosts = await getPosts()

  const posts = await Promise.all(
    originPosts.map(item => {
      const { content: markdown, name, extname, heading } = item
      const content = marked(markdown)

      let post = postTemplate

      post = useMeat(post, { title: heading, key: 'value' })
      post = useStyle(post)
      post = useIncludes(post)
      post = useVar(post)

      // 推文插值
      post = post.replace('{{ use content }}', content)

      // #region 启用 var 标签
      post = post.replace(/&lt;var&gt;/g, '<var>')
      post = post.replace(/&lt;\/var&gt;/g, '</var>')
      // #endregion 启用 var 标签

      return { name, content: post, extname }
    })
  )

  return posts
}
