import { metas } from '../../../mona.config.js'
import reduceMetaTags from '../../modules/templates/reduceMetaTags.js'

console.log(reduceMetaTags(metas, { name: 'whh', age: 18, title: 'new title' }))

console.log(reduceMetaTags(metas, undefined))

console.log(
  reduceMetaTags(undefined, { name: 'whh', age: 18, title: 'new title' })
)

console.log(reduceMetaTags())
