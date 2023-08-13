import getFileDetails from '../../modules/utils/getFileDetails.js'

console.log(await getFileDetails('./app/main.js', { recursive: false }))

console.log(await getFileDetails('./app', { recursive: false }))

console.log(await getFileDetails('./app', { recursive: true }))

debugger
