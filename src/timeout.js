const instanceDescTimeOut = 'TimeOut'
const singletonTimeOut = Symbol(instanceDescTimeOut)

export class TimeOut {
  // ...
  constructor () {
    this.instance = this
    this.timers = []
  }

  static getInstance () {
    if (!this[singletonTimeOut]) {
      this[singletonTimeOut] = new TimeOut()
    }
    return this[singletonTimeOut]
  }

  insertTimer (timer) {
    this.timers.push(timer)
  }

  clearTimers () {
    while (this.timers.length !== 0) {
      let timer = this.timers.shift()
      clearTimeout(timer)
    }
  }
}

export default TimeOut
