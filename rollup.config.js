import path from 'path'
import { fileURLToPath } from 'url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default {
  input: 'app/main.js',
  output: {
    file: 'mona.js',
    format: 'es',
  },
  external: [
    'path',
    'url',
    'fs/promises',
    'marked',
    path.resolve(root, 'mona.config.js'),
  ],
}
