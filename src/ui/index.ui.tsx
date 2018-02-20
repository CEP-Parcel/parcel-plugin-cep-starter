import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as path from 'path'

import App from './containers/App'

import './index.ui.css'

import {
  inCEPEnvironment,
  evalExtendscript,
  loadExtendscript,
  getExtensionPath,
  getHostEnvironment,
} from 'cep-interface'

// node-require
import os = require('os')
// node-require
import fs = require('fs-extra')

import { logger } from './logger'

if (inCEPEnvironment()) {
  const extensionPath = getExtensionPath()

  const platform = os.platform()

  logger.info('start', extensionPath)

  const manifest = fs.readJSONSync(path.join(extensionPath, 'manifest.json'))

  loadExtendscript(manifest['index.jsx.ts'])

  const skinInfo = getHostEnvironment()

  // const result = fs.readFileSync(
  //   path.join(window.cep_node.__dirname, 'CSXS', 'manifest.xml')
  // )
  // console.log(result.toString())

  // evalExtendscript(`alert("Hello ${Date.now()}");`)
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
