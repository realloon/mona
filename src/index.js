// my modules
// import initStructure from './modules/initStructure.js'
import createEnter from './modules/createEnter.js'
// import createPosts from './modules/createPosts.js'
// import handleResources from './modules/handleResources.js'
// import print from './modules/utils/print.js'

import x from '../app/modules/utils/getFiles.js'
await x('./')
debugger

try {
  await initStructure() // 初始化目录结构
} catch (error) {
  throw error
}

try {
  await Promise.all([
    createEnter(), // 生成主页面
    createPosts(), // 生成文章页面
    handleResources(), // 处理资源
  ])

  print('🎉 Mission accomplished!')
} catch (error) {
  console.error(error)
}
