import fs from 'fs/promises'
import path from 'path'

/**
 * Copies files recursively from the source directory to the destination directory.
 * @param {string} srcDir - The path to the source directory.
 * @param {string} destDir - The path to the destination directory.
 * @returns {Promise<void>} - A Promise that resolves when the files are successfully copied.
*/
export default async function copyFilesRecursively(srcDir, destDir) {
  const files = await fs.readdir(srcDir)

  await Promise.all(
    files.map(async filename => {
      const src = path.join(srcDir, filename)
      const dest = path.join(destDir, filename)

      const stat = await fs.stat(src)
      if (stat.isDirectory()) {
        await fs.mkdir(dest, { recursive: true })
        await copyFilesRecursively(src, dest)
      } else {
        await fs.copyFile(src, dest)
      }
    })
  )
}
