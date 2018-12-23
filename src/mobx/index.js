import { observable, isArrayLike } from 'mobx'
// observable.box
// array object map

const arr = observable([1, 2, 3])
// console.log(arr, Array.isArray(arr), isArrayLike(arr));
// console.log(arr[5]);

const obj = observable({ a: 1, b: 2 })
// console.log(obj);
// console.log(obj.a);
// 拓展的话就是用extendObservable方法，因此开始的话就直接申明会用到的属性
const map = observable(new Map())
// map.set('a',1)
// console.log(map.has('a'));
// map.delete('a')
// console.log(map.has('a'));

var num = observable.box(20)
var str = observable.box('string')
var boo = observable.box(false)
// get获取原来的值，set修改原来的值
num.set(111)
// console.log(num.get(),str.get(),boo.get());

class Store {
  @observable array = []
  @observable obj = {}
  @observable map = new Map()
  // 会自动识别普通还是特殊
  @observable string = 'hello'
  @observable number = 1
  @observable bool = false
}

