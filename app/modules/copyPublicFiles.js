import print from './utils/print.js'
import copyFilesRecursively from './utils/copyFilesRecursively.js'

export default async function transfePublicFiles() {
  const publicDir = './public'
  const distDir = './dist'

  await copyFilesRecursively(publicDir, distDir)
  print('📦 Public resource successfully built.')
}
