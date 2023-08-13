import concatMetaTags from '../../modules/templates/concatMetaTags.js'

console.log(concatMetaTags())

console.log(concatMetaTags({ name: 'whh', age: 18 }))

console.log(concatMetaTags({ name: 'whh', age: 18, title: 'new title' }))
