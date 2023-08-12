// node modules
import fs from 'fs/promises'
import path from 'path'
// my modules
import { root } from '../../mona.config.js'
import useIncludes from './useIncludes.js'
import useVar from './useVar.js'
import useMeat from './useMeat.js'
import useList from './useList.js'
import print from './utils/print.js'

export default async function createEnter() {
  const indexPath = path.join(root, './src/index.html')
  const indexTemplate = (await fs.readFile(indexPath)).toString()

  let index = indexTemplate

  // 模板插值
  index = useIncludes(index)

  // 变量插值
  index = useVar(index)

  // meta 插值
  index = useMeat(index)

  // 文章列表插值
  index = await useList(index)

  try {
    await fs.writeFile(path.join(root, './dist/index.html'), index)
    print('🏠 Website entry successfully built.')
  } catch (error) {
    console.error(error)
  }
}
