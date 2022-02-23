const modulesFiles = require.context('./apps', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  const appName = value.default.name
  modules[appName] = value.default
  return modules
}, {})

// 获取用户微应用配置，后期从服务端获取，暂时使用配置文件读取
export default function getAppConfigs() {
  return modules
}

