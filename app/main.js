console.time('timer')

import createEnter from './modules/generators/createEnter.js'
import print from './modules/utils/print.js'

try {
  console.timeLog('timer')
  await Promise.all([createEnter()])
  console.timeLog('timer')

  print('🎉 Mission accomplished!')
} catch (error) {
  console.error(error)
}

console.timeEnd('timer')
