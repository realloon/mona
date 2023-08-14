console.time('timer')
console.timeLog('timer')

import createEnter from './modules/generators/createEnter.js'
import createPosts from './modules/generators/creatPosts.js'
import print from './modules/utils/print.js'

try {
  await Promise.all([
    createPosts(), // create post pages
    createEnter(), // create enter page
  ])

  print('🎉 Mission accomplished!')
} catch (error) {
  console.error(error)
} finally {
  console.timeEnd('timer')
}
