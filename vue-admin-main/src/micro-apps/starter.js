import { start } from 'qiankun'

let started = window.__QIANKUN_STARTED__ = false

function startApps() {
  if (!started) {
    start()
    started = true
  }
  window.__QIANKUN_STARTED__ = started
}

export default startApps
