import path from 'path'
//
import { root } from '../../mona.config.js'
import getFiles from './getFiles.js'
import isDateFileNameValid from './utils/isDateFileNameValid.js'
import getPostMetas from './getPostMetas.js'
import print from './utils/print.js'

export default async function getPosts() {
  const posts = await getFiles(path.join(root, `./src/posts/`))

  const postsObj = posts.map(post => {
    const { extname, name, content } = post

    if (!isDateFileNameValid(name + extname)) return null

    const title = name.split('-').slice(0, -3).join('-')
    const href = encodeURI(`/blog/${title}.html`)
    const date = name.slice(-10) // ISO 8601 Date

    const property = { name, extname, content, title, href, date }

    try {
      // 读取 meta 信息
      const { heading } = getPostMetas(content)

      return { ...property, heading }
    } catch (error) {
      // 错误处理
      const { name, target } = error
      if (name === 'MonaFormatError') {
        print(`${target} 格式错误`, 'warn')
        return null
      } else {
        throw error
      }
    }
  })

  const result = postsObj.filter(item => item !== null)

  return result
}
