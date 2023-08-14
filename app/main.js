console.time('timer')
console.timeLog('timer')

import createEnter from './modules/generators/createEnter.js'
import print from './modules/utils/print.js'

try {
  await Promise.all([createEnter()])

  print('🎉 Mission accomplished!')
} catch (error) {
  console.error(error)
} finally {
  console.timeEnd('timer')
}
