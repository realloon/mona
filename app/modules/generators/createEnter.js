import fs from 'fs/promises'
import MonaTplEngine from '../templates/MonaTplEngine.js'
import getFileDetails from '../utils/getFileDetails.js'
import print from '../utils/print.js'

/**
 * Creates the website entry file.
 * @returns {Promise<void>} - A Promise that resolves when the website entry file is successfully created.
 * @throws {Error} - If the "/dist/" folder doesn't exist.
 */
export default async function createEnter() {
  const { content: tpl } = await getFileDetails('./src/index.html')
  const engine = MonaTplEngine(tpl)

  await engine.useIncludesAsync()
  await engine.useListAsync()
  engine.useMeta()
  engine.useStyle()
  engine.useVars()

  const enter = engine.render()

  try {
    await fs.writeFile('./dist/index.html', enter)

    print('🏠 Website entry successfully built.')
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('The "/dist/" folder must exist.')
    } else {
      throw error
    }
  }
}
