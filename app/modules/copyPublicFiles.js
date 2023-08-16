import print from './utils/print.js'
import copyFilesRecursively from './utils/copyFilesRecursively.js'

/**
 * Transfers public files from the "public" directory to the "dist" directory.
 * @returns {Promise<void>} - A Promise that resolves when the public files are successfully transferred.
 */
export default async function transfePublicFiles() {
  const publicDir = './public'
  const distDir = './dist'

  await copyFilesRecursively(publicDir, distDir)
  print('📦 Public resource successfully built.')
}
