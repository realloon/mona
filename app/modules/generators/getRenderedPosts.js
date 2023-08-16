import getFileDetails from '../utils/getFileDetails.js'
import getPostDetails from './getPostDetails.js'
import MonaTplEngine from '../templates/MonaTplEngine.js'

/**
 * Retrieves the rendered blog posts using a template file and source files.
 * @param {string} templatePath - The path to the template file for rendering the blog posts.
 * @param {string} sourcesPath - The path to the folder containing the source files for the blog posts.
 * @returns {Promise<Object[]>} - A Promise that resolves to an array of rendered blog posts.
 */
export default async function getRenderedPosts(templatePath, sourcesPath) {
  const postTpl = await getPostTpl(templatePath)
  const posts = await getPostDetails(sourcesPath)

  return posts.map(({ title, content: rawCtx, metas }) => {
    const engine = MonaTplEngine(postTpl)

    engine.useMeta({ ...metas })
    engine.useContent(rawCtx)
    const content = engine.render()

    return { content, title }
  })
}

/**
 * Retrieves the template file for rendering the blog posts.
 * @param {string} path - The path to the template file.
 * @returns {Promise<string>} - A Promise that resolves to the content of the template file.
 */
async function getPostTpl(path) {
  const { content } = await getFileDetails(path)
  const engine = MonaTplEngine(content)
  return await engine
    .useIncludesAsync()
    .then(ctx => ctx.useStyle().useVars().render())
}
