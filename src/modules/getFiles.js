import fs from 'fs/promises'
import path from 'path'

const cache = new Map()

/**
 * 读取指定目录下的文件，并返回包含文件名和内容的对象数组
 * @param {string} root - 根目录的路径
 * @returns {Promise<Array<{name: string, content: string, extname: string}>>} - 包含文件名和内容的对象数组的 Promise
 */
export default async function getFiles(root) {
  const includes = await fs.readdir(root)

  // uese cache
  if (cache.has(root)) cache.get(root)

  const result = Promise.all(
    includes.map(async include => {
      const extname = path.extname(include)
      const name = path.basename(include, extname)

      const content = (await fs.readFile(path.join(root, include))).toString()

      return { name, content, extname }
    })
  )

  cache.set(root, result)

  return result
}
