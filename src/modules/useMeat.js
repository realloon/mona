import config from '../../mona.config.js'
const { meta } = config

export default function useMeat(template, customMeta) {
  const combedMeta = Object.assign(meta, customMeta)

  const metaTags = Object.entries(combedMeta).reduce((pre, cur) => {
    const [name, content] = cur
    const metaTag =
      name !== 'title'
        ? `<meta name="${name}" content="${content}" />`
        : `<title>${content}</title>`

    return pre + metaTag
  }, '')

  return template.replace('{{ use meta }}', metaTags)
}
