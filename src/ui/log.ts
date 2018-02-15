import { nodeRequire } from './utils'
const fs = nodeRequire('fs-extra')
const os = nodeRequire('os')
const path = nodeRequire('path')
const pino = nodeRequire('pino')

import * as os2 from 'os'
import * as p2 from 'path'
import * as p from 'pino'

const p3 = import('pino')
console.log(p3)

export function getLogPath(id: string): string {
  const homeDir = os.homedir ? os.homedir() : process.env['HOME']
  const file = `${id}.log`
  const platform = os.platform()

  switch (platform) {
    case 'linux': {
      return path.join(homeDir, '.logs', file)
    }

    case 'darwin': {
      return path.join(homeDir, 'Library', 'Logs', file)
    }

    case 'win32': {
      return path.join(homeDir, 'AppData', 'Roaming', file)
    }

    default:
      return path.join(homeDir, '.logs', file)
  }
}

export function createLogger(id: string) {
  const logPath = getLogPath(id)
  return pino({}, fs.createWriteStream(logPath, { flags: 'a' }))
}
