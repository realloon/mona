import fs from 'fs/promises'
import print from './utils/print.js'

console.time('init')

export default async function initStructure() {
  const path = './dist/blog'

  try {
    await fs.access(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(path, { recursive: true })
      print('📁 Directory structure successfully built.')
      console.timeEnd('init')
    } else {
      throw error
    }
  }
}
