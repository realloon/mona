import getFileDetails from '../utils/getFileDetails.js'
import getPostDetails from './getPostDetails.js'
import MonaTplEngine from '../templates/MonaTplEngine.js'

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

async function getPostTpl(path) {
  const { content } = await getFileDetails(path)
  const engine = MonaTplEngine(content)
  return await engine
    .useIncludesAsync()
    .then(ctx => ctx.useStyle().useVars().render())
}
