import getRenderedPosts from '../../modules/generators/getRenderedPosts.js'

const r = await getRenderedPosts('./src/layouts/post.html', './src/posts')
console.log(r)
