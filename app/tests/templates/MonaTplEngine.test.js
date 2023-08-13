import getFileDetails from '../../modules/utils/getFileDetails.js'
import MonaTplEngine from '../../modules/templates/MonaTplEngine.js'

// const template = 'Hello, {{ name }}! / {{ use meta }}'

const { content: template } = await getFileDetails('./src/index.html')

const ctx = MonaTplEngine(template)

const rendered = await ctx
  .useIncludesAsync()
  .then(enter =>
    enter
      .useMeta({ title: 'new title', author: 'whh' })
      .useStyle()
      .useVars({ name: 'whh' })
      .render()
  )

console.log(rendered)

// #endregion chained calling

// #region async/await calling
// ctx.useMeta({ title: 'new Title' })
// ctx.useVars({ name: 'whh' })
// await ctx.useIncludes()
// console.log(ctx.render())
// #endregion async/await calling
