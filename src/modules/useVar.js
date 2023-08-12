import config from '../../mona.config.js'

const reg = /{{ var "(\w+)" }}/g

export default function useVar(template) {
  let transed = template

  Array.from(template.matchAll(reg)).forEach(matched => {
    const [target, key] = matched
    const value = config.var[key]

    transed = transed.replace(target, value)
  })

  return transed
}
