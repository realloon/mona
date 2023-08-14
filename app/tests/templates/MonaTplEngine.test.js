import getFileDetails from '../../modules/utils/getFileDetails.js'
import MonaTplEngine from '../../modules/templates/MonaTplEngine.js'

// const template = 'Hello, {{ name }}! / {{ use meta }}'

const { content: template } = await getFileDetails('./src/index.html')

// #region async/await calling
const engine1 = MonaTplEngine(template)
await engine1.useIncludesAsync()
engine1.useMeta({ title: 'new title', author: 'whh' })
engine1.useStyle()
engine1.useVars({ name: 'whh' })
const rendered1 = engine1.render()
console.log(rendered1)
// #endregion

// #region
const engine2 = MonaTplEngine(template)
const rendered2 = await engine2
  .useIncludesAsync()
  .then(ctx =>
    ctx
      .useMeta({ title: 'new title', author: 'whh' })
      .useStyle()
      .useVars({ name: 'whh' })
      .render()
  )
console.log(rendered2)
// #endregion
