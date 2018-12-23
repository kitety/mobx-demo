function log (target) {
  // 获取成员签名
  const desc = Object.getOwnPropertyDescriptors(target.prototype)
  // 遍历成员名称
  for (const key of Object.keys(desc)) {
    if (key === 'constructor') {
      continue
    }
    // 值类型
    const func = desc[key].value
    if ('function' === typeof func) {
      Object.defineProperty(target.prototype, key, {
        value (...args) {
          console.log('begin', key);
          const ret = func.apply(this, args)
          console.log('end', key);
          return ret
        }
      })
    }
  }
}
//实例对象，名称 描述符
function readonly (target, key, desc) {
  desc.writable = false
}
function validate (target, key, desc) {
  const func = desc.value
  desc.value = function (...args) {
    for (const num of args) {
      if ('number' !== typeof num) {
        throw new Error(`"${num}" is not a number`)
      }
    }
    return func.apply(this.args)
  }
}

@log
class Numberic {
  @readonly PI = 3.141592653
  @validate add (...nums) {
    return nums.reduce((p, n) => (p + n), 0)
  }
}
var n = new Numberic()
console.log(n.add(1, 2));
// console.log(n.add(1,"sdgj"));
// n.PI = 3 // error
