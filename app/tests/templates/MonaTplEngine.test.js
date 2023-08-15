import getFileDetails from '../../modules/utils/getFileDetails.js'
import MonaTplEngine from '../../modules/templates/MonaTplEngine.js'

// const template = 'Hello, {{ name }}! / {{ use meta }}'
const { content: template } = await getFileDetails('./src/index.html')

// #region async/await calling
const engine = MonaTplEngine(template)
await engine.useIncludesAsync()
await engine.useListAsync()
engine.useMeta({ title: 'new title', author: 'whh' })
engine.useStyle()
engine.useVars({ name: 'whh' })
const rendered = engine.render()
console.log(rendered)
// #endregion
