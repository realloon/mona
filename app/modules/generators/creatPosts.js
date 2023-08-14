import fs from 'fs/promises'
// import { join } from 'path'
import { marked } from 'marked'
import MonaTplEngine from '../templates/MonaTplEngine.js'
import getFileDetails from '../utils/getFileDetails.js'
import print from '../utils/print.js'

function getPostDetails(files) {
  return files.map(({ content: rawCtx, fileName, modifiedTime }) => {
    const title = fileName.slice(0, -14)
    const content = marked(rawCtx)
    const publicTime = fileName.slice(-13, -3)
    const href = encodeURI(`/blog/${title}.html`)

    return {
      title,
      content,
      publicTime,
      modifiedTime,
      href,
    }
  })
}

function renderPost(postTpl, posts) {
  return posts.map(({ title, content: rawCtx }) => {
    const engine = MonaTplEngine(postTpl)

    engine.useMeta({ title })
    engine.useContent(rawCtx)
    const content = engine.render()

    return { content, title }
  })
}

export default async function createPosts() {
  const { content: baseTpl } = await getFileDetails('./src/layouts/post.html')
  const engine = MonaTplEngine(baseTpl)
  const postTpl = await engine
    .useIncludesAsync()
    .then(ctx => ctx.useStyle().useVars().render())

  const details = await getFileDetails('./src/posts')
  const posts = getPostDetails(details)
  const renderedPost = renderPost(postTpl, posts)

  try {
    await Promise.all(
      renderedPost.map(async ({ content, title }) => {
        await fs.writeFile(`./dist/blog/${title}.html`, content)
      })
    )

    print('📝 Blog posts successfully built.')
  } catch (error) {
    if ((error.code = 'ENOENT')) {
      const err = new Error('The "/dist/blog/" folder must exist.')
      err.name = 'Mona-ENOENT'
      throw err
    } else {
      throw error
    }
  } finally {
    console.timeLog('timer')
  }
}
