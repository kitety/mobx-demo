import { observable, isArrayLike, computed, autorun, when, reaction, action, runInAction } from 'mobx'
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
  @computed get mixed () {
    return this.string + '/' + this.number
  }
  @action.bound bar () {
    this.string = '1366_str'
    this.number = 1366
  }
  // @action bar(){
  //   this.string = '1366_str'
  //   this.number = 1366
  // }
}
var store = new Store()
// computed
// var foo = computed(function () {
//   return store.string + '/' + store.number
// })
// // 监视数据的变化
// foo.observe(function (change) {
//   console.log(change);
// })
// // get获取
// console.log(foo.get());
// store.string="string_hello"
// store.string = 5858

//autorun
// 自动运行什么：传入的函数参数
// 什么触发自动运行：修改autorun引用的任意的数据
autorun(() => {
  // console.log(store.string + '/' + store.number);
  // console.log(store.mixed);
})
// store.string="string_hello"
store.number = 12

//when 1:可观察数据返回的布尔值  2:1为真的时候执行
// 第一个参数要是可观察数据。加入默认为真也会执行
// 同步执行
// autorun先于when
// when(() => store.bool, () => console.log('it is true'))
store.bool = true

//reaction 1:可观察数据返回的布尔值  2:1为真的时候执行
//第一个函数 监视这些被修改
reaction(() => [store.number, store.string], arr => console.log(arr.join('/')))
// store.string = '1333333'
// store.number = 5656

// action action.bound
// store.bar()
// reaction只执行一次

// 一样的
var bar = store.bar
// bar()

// runInAction 和调用store.bar一样
// runInAction('hello runinaction',() => {
//   store.string = '1366_str'
//   store.number = 1366
//  })
