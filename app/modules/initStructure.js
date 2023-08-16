import fs from 'fs/promises'
import print from './utils/print.js'

/**
 * Initializes the directory structure.
 * @param {string} path - The path to the directory.
 * @returns {Promise<void>} - A Promise that resolves when the directory structure is successfully built.
 */
export default async function initStructure(path = './dist/blog') {
  try {
    await fs.access(path)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(path, { recursive: true })
      print('📁 Directory structure successfully built.')
    } else {
      throw error
    }
  }
}
