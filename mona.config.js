import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  meta: {
    author: 'realoon',
    title: '真真爱编程 - 博客',
    description: "realloon's blog",
    generator: 'mona',
  },
  var: { name: 'Realoon', year: new Date().getFullYear(), var: 'mona' },
}

export const root = __dirname
