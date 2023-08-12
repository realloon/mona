import path from 'path'
// module
import { root } from '../../mona.config.js'
import getFiles from './getFiles.js'

const reg = /{{ include "(\w+?)" }}/g

const includeArray = await getFiles(path.join(root, './src/includes'))

export default function useIncludes(template) {
  let trans = template

  Array.from(template.matchAll(reg)).forEach(matched => {
    const [target, name] = matched
    const { content } = includeArray.find(item => item.name === name)

    trans = trans.replace(target, content)
  })

  return trans
}
