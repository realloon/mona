import { data } from '../../../mona.config.js'
import mapTplVars from '../../modules/templates/mapTplVars.js'

const tpl = 'hello: {{ name }}'
const vars = { name: 'whh' }

console.log(mapTplVars(tpl, data, vars))

console.log(mapTplVars(tpl, data, {}))

console.log(mapTplVars('', data, undefined))

console.log(mapTplVars('', undefined, vars))

console.log(mapTplVars('', undefined, undefined))

console.log(mapTplVars(undefined))

debugger
