import fs from 'fs/promises'
import { marked } from 'marked'
import MonaTplEngine from '../templates/MonaTplEngine.js'
import getFileDetails from '../utils/getFileDetails.js'
import print from '../utils/print.js'

console.time('posts')

export default async function createPosts() {
  const postTpl = await getPostTpl('./src/layouts/post.html')
  const postDetails = await getPostDetails('./src/posts')
  const renderedPosts = renderPosts(postTpl, postDetails)

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

async function getPostTpl(path) {
  const { content } = await getFileDetails(path)
  const engine = MonaTplEngine(content)
  return await engine
    .useIncludesAsync()
    .then(ctx => ctx.useStyle().useVars().render())
}

async function getPostDetails(path) {
  const files = await getFileDetails(path)

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

function renderPosts(postTpl, posts) {
  return posts.map(({ title, content: rawCtx }) => {
    const engine = MonaTplEngine(postTpl)

    engine.useMeta({ title })
    engine.useContent(rawCtx)
    const content = engine.render()

    return { content, title }
  })
}
