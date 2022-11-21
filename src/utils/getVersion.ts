import { readFileSync } from 'fs'
import { resolve } from 'path'

export default () => {
    const pathToPackageJson = resolve('package.json')
    const packageJsonObj = JSON.parse(readFileSync(pathToPackageJson, 'utf8'))
    return packageJsonObj.version
}
