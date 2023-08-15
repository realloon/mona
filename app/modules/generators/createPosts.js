import fs from 'fs/promises'
import getRenderedPosts from './getRenderedPosts.js'
import print from '../utils/print.js'

console.time('posts')

export default async function createPosts(
  templatePath = './src/layouts/post.html',
  sourcesPath = './src/posts'
) {
  const renderedPosts = await getRenderedPosts(templatePath, sourcesPath)

  try {
    await Promise.all(
      renderedPosts.map(async ({ content, title }) => {
        await fs.writeFile(`./dist/blog/${title}.html`, content)
      })
    )

    print('📝 Blog posts successfully built.')
    console.timeEnd('posts')
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('The "/dist/blog/" folder must exist.')
    } else {
      throw error
    }
  }
}
