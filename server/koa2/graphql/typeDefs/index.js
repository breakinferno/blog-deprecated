import path from 'path'
import fs from 'fs'

let typeDefs = ''
const rootPath = path.join(__dirname, './defs');

fs.readdirSync(rootPath).forEach(typeDef => {
    typeDefs += fs.readFileSync(path.join(rootPath, typeDef), 'utf8')
})

module.exports = typeDefs