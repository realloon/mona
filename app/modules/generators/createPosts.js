import fs from 'fs/promises'
import getRenderedPosts from './getRenderedPosts.js'
import print from '../utils/print.js'

/**
 * Creates blog posts from source files and saves them in the "dist/blog" folder.
 * @param {string} templatePath - The path to the template file for rendering the blog posts. Default is "./src/layouts/post.html".
 * @param {string} sourcesPath - The path to the folder containing the source files for the blog posts. Default is "./src/posts".
 * @returns {Promise<void>} - A Promise that resolves when the blog posts are successfully created.
 * @throws {Error} - If the "/dist/blog/" folder doesn't exist.
 */
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
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('The "/dist/blog/" folder must exist.')
    } else {
      throw error
    }
  }
}
