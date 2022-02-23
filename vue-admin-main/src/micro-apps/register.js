import { registerMicroApps } from 'qiankun'
import getAppConfigs from './config'

function getAppEntry(app) {
  return process.env.NODE_ENV === 'dev' ? `http://localhost:${app.devPort}` : app.entry
}

export function getRegisterConfig() {
  const config = getAppConfigs()
  return Object.keys(config).map(name => {
    const app = config[name]
    return {
      name,
      entry: getAppEntry(app),
      container: `#${name}-wrap`,
      activeRule: `/${name}`
    }
  })
}

export function registerApps() {
  const config = getRegisterConfig()
  registerMicroApps(config)
}
