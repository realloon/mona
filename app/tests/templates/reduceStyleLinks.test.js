import reduceStyleLinks from '../../modules/templates/reduceStyleLinks.js'

console.log(reduceStyleLinks(['style-url-1', 'style-url-2', 'style-url-3']))

try {
  console.log(reduceStyleLinks())
} catch (error) {
  console.error(error)
}
