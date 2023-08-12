import config from '../../mona.config.js'
const { style } = config.cdn

export default function useStyle(template) {
  let transed = template

  const stylesheet = style.reduce(
    (pre, cur) => pre + `<link rel="stylesheet" href="${cur}" />`,
    ''
  )

  return transed.replace('{{ use style }}', stylesheet)
}
