import path from 'path'
import fs from 'fs/promises'
//
import { root } from '../../mona.config.js'
import print from './utils/print.js'

export default async function initStructure() {
  // 创建目录结构
  const blogPath = path.join(root, './dist/blog')
  try {
    await fs.access(blogPath)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(blogPath, { recursive: true })
      print('📁 Directory structure successfully built.')
    } else {
      throw error
    }
  }
}
