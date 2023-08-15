import mapTplIncldes from '../../modules/templates/mapTplIncldes.js'

const tpl = '{{ include "header" }}hello{{ include "footer" }}'
const reg = /{{ include "(\w+?)" }}/g

console.log(await mapTplIncldes(tpl, reg))
debugger
