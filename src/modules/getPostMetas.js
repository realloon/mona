import MonaFormatError from './utils/MonaFormatError.js'

export default function getPostMetas(content) {
  const lines = content.split('\n')
  const firstLine = lines[0].trim()
  const isTandHeading = /^# /.test(firstLine)

  if (!isTandHeading) {
    throw new MonaFormatError({
      message: 'illegal heading' + content,
      target: 'heading',
    })
  }

  const heading = firstLine.slice(2)

  return { heading }
}
