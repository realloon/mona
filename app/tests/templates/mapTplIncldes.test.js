import mapTplIncldes from '../../modules/templates/mapTplIncldes.js'

const tmp = '{{ include "header" }}hello{{ include "footer" }}'

console.log(await mapTplIncldes(tmp))
debugger