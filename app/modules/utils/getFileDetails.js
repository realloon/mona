import { stat, readdir, readFile } from 'fs/promises'
import { extname, basename, join } from 'path'

/**
 * Get details of a file or directory.
 * @param {string} path - The path to the file or directory.
 * @param {object} [options] - The options for getting details.
 * @param {boolean} [options.recursive=false] - Whether to get details recursively for directories.
 * @returns {Promise<object[]>} - A promise that resolves to an array of file details objects.
 * @throws {Error} - If an invalid path is provided.
 */
export default async function getFileDetails(
  path,
  options = { recursive: false }
) {
  const stats = await stat(path)

  if (stats.isFile()) {
    return getFileStats(path, stats)
  } else if (stats.isDirectory()) {
    const files = await readdir(path)
    return Promise.all(
      files.map(getFileOrDirectoryDetails(path, options))
    ).then(fileDetails => fileDetails.flat().filter(Boolean))
  } else {
    throw new Error('Invalid path')
  }
}

/**
 * Get details of a file.
 * @param {string} path - The path to the file.
 * @param {object} stats - The stats object of the file.
 * @returns {Promise<object>} - A promise that resolves to the file details object.
 */
async function getFileStats(path, stats) {
  const data = await readFile(path, 'utf8')
  return {
    path,
    fileName: basename(path),
    fileExt: extname(path),
    modifiedTime: stats.mtime,
    content: data,
  }
}

/**
 * Get details of a file or directory.
 * @param {string} path - The path to the file or directory.
 * @param {object} [options] - The options for getting details.
 * @param {boolean} [options.recursive=false] - Whether to get details recursively for directories.
 * @returns {Promise<object>} - A promise that resolves to the file or directory details object.
 */
function getFileOrDirectoryDetails(path, options = { recursive: false }) {
  return async file => {
    const filePath = join(path, file)
    const fileStats = await stat(filePath)

    if (fileStats.isFile()) {
      return getFileStats(filePath, fileStats)
    } else if (options.recursive && fileStats.isDirectory()) {
      return getFileDetails(filePath, options)
    }
  }
}
