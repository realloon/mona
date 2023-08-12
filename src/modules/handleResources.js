import fs from 'fs/promises'
import path from 'path'
//
import { root } from '../../mona.config.js'
import print from './utils/print.js'
import copyFilesRecursively from './utils/copyFilesRecursively.js'

export default async function handleResources() {
  try {
    const publicDir = path.join(root, 'public')
    const distDir = path.join(root, 'dist')

    await fs.mkdir(distDir, { recursive: true })
    await copyFilesRecursively(publicDir, distDir)

    print('📄 Static resource successfully built.')
  } catch (error) {
    console.error(error)
  }
}
