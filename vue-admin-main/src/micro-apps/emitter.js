import mitt from 'mitt'
import Vue from 'vue'

const emitter = mitt()
Vue.prototype.$eventBus = emitter

export default emitter