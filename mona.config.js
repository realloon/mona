import path from 'path'
import { fileURLToPath } from 'url'

export const root = path.dirname(fileURLToPath(import.meta.url))

export const metas = {
  author: 'Realoon',
  title: 'Realoon',
  description: "realloon's blog",
  generator: 'mona',
}

export const data = {
  name: 'Realoon',
  year: new Date().getFullYear(),
  rep: 'https://github.com/realloon/mona',
}

export const cdn = {
  styles: [
    '//at.alicdn.com/t/c/font_4206319_16ttf41hwjy.css',
    'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css',
  ],
  scripts: [],
}

export const slots = {
  meta: '{{ use meta }}',
  list: '{{ use list }}',
  style: '{{ use style }}',
  content: '{{ use content }}',
  include: /{{ include "(\w+?)" }}/g,
}

export const dir = {
  posts: './src/posts',
}
