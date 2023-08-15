import initStructure from './modules/initStructure.js'
import createEnter from './modules/generators/createEnter.js'
import createPosts from './modules/generators/createPosts.js'
import copyPublicFiles from './modules/copyPublicFiles.js'
import print from './modules/utils/print.js'

console.time('⌛️')

try {
  await initStructure() // initializing directory structure

  await Promise.all([
    createEnter(), // create enter page
    createPosts(), // create post pages
    copyPublicFiles(), // copy /pubilc/* src => /dist/*
  ])

  print('🎉 Mission accomplished!')
  console.timeEnd('⌛️')
} catch (error) {
  console.error(error)
}
