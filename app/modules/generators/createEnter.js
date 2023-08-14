import fs from 'fs/promises'
import MonaTplEngine from '../templates/MonaTplEngine.js'
import getFileDetails from '../utils/getFileDetails.js'
import print from '../utils/print.js'

export default async function createEnter() {
  const { content: enterTpl } = await getFileDetails('./src/index.html')
  const ctx = MonaTplEngine(enterTpl)

  try {
    const index = await ctx
      .useIncludesAsync()
      .then(ctx => ctx.useMeta().useStyle().useVars().render())

    await fs.writeFile('./dist/index.html', index)
    print('🏠 Website entry successfully built.')
  } catch (error) {
    throw error
  } finally {
    console.timeLog('timer')
  }
}
