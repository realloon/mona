import fs from 'fs/promises'
import MonaTplEngine from '../templates/MonaTplEngine.js'
import getFileDetails from '../utils/getFileDetails.js'
import print from '../utils/print.js'

export default async function createEnter() {
  const { content } = await getFileDetails('./src/index.html')
  const engine = MonaTplEngine(content)

  try {
    await engine.useIncludesAsync()
    engine.useMeta()
    engine.useStyle()
    
    const enter = engine.render()

    await fs.writeFile('./dist/index.html', enter)

    print('🏠 Website entry successfully built.')
  } catch (error) {
    throw error
  } finally {
    console.timeLog('timer')
  }
}
