import { start } from 'qiankun-dhcc'
import { registerApps } from './register'
import { initTabView } from './tab-view'

/**
 * 初始化微应用
 * @param {vm} inst vue根实例 
 */
export function initApps(inst) {
    registerApps()
    initTabView(inst)
}


const defaultOptions = {
    sandbox: {
        // 样式隔离(增加微应用前缀)
        experimentalStyleIsolation: true
    },
    // 开启keepAlive
    keepAlive: true,
}

let started

/**
 * 启动微应用
 */
export function startApps(options) {
    if (!started) {
        const opts = Object.assign({}, defaultOptions, options)
        start(opts)
        started = true
    }
}
