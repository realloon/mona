import path from 'path'
import fs from 'fs/promises'
// module
import { print, isDateFileNameValid } from './utils/index.js'
import { root } from '../../mona.config.js'
import getTransedPosts from './getTransedPosts.js'

export default async function createPosts() {
  const blogRoot = path.join(root, './dist/blog')
  const posts = await getTransedPosts()

  try {
    await Promise.all(
      posts.map(post => {
        const { name, content, extname } = post

        if (!isDateFileNameValid(name + extname)) {
          return print(
            `"${name}" is incorrect. The correct format should be "my-blog-2023-06-18".`,
            'warn'
          )
        }

        // 处理文件名
        const normalizedName = name.slice(0, -11) // ISO 8601 Date
        const postPath = path.join(blogRoot, `${normalizedName}.html`)

        fs.writeFile(postPath, content)
      })
    )

    print('📝 Blog post successfully built.')
  } catch (error) {
    throw error
  }
}
