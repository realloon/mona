import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  meta: {
    author: 'realoon',
    title: 'Realoon',
    description: "realloon's blog",
    generator: 'mona',
  },
  cdn: {
    style: ['//at.alicdn.com/t/c/font_4206319_7d2kn7spge3.css'],
  },
  var: {
    name: 'Realoon',
    year: new Date().getFullYear(),
    var: 'mona',
  },
}

export const root = __dirname
