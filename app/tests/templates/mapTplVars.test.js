import mapTplVars from '../../modules/templates/mapTplVars.js'

const tpl = 'hello: {{ name }}'
const vars = { name: 'whh' }

console.log(mapTplVars(tpl, vars))

console.log(mapTplVars(tpl, {}))

console.log(mapTplVars('', vars))

// console.log(mapTplVars(undefined, vars))

console.log(mapTplVars(tpl, undefined)) //  required mona.config.js > data is also undefined.

debugger
