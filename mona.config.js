import path from 'path'
import { fileURLToPath } from 'url'

export const root = path.dirname(fileURLToPath(import.meta.url))

export const metas = {
  author: 'realoon',
  title: 'Realoon',
  description: "realloon's blog",
  generator: 'mona',
}

export const data = {
  name: 'Realoon',
  year: new Date().getFullYear(),
  var: 'mona',
}

export const cdn = {
  styles: ['//at.alicdn.com/t/c/font_4206319_7d2kn7spge3.css'],
  scripts: [],
}
