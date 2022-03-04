import { start } from 'qiankun'
import { registerApps } from './register'
import { initTagView } from './tagView'

/**
 * 初始化微应用
 * @param {vm} inst vue根实例 
 */
export function initApps(inst) {
    registerApps()
    initTagView(inst)
}


let started = window.__QIANKUN_STARTED__ = false

/**
 * 启动微应用
 */
export function startApps() {
    if (!started) {
        start({
            sandbox: {
                // 样式隔离(增加微应用前缀)
                experimentalStyleIsolation: true
            }
        })
        started = true
    }
    window.__QIANKUN_STARTED__ = started
}
