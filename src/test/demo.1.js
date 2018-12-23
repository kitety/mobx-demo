// 
// function Animal () { }
// function Dog () { }
// Object.defineProperties(Animal.prototype, {
//   name: {
//     values () {
//       return 'Animal'
//     }
//   },
//   say: {
//     values () {
//       return 'I am ' + this.name()
//     }
//   }
// })
// /**
//  * Dog instanceof Animal =>true
//  * dog.__proto__.__proto__...===Animal.prototype
//  * dog.__proto__===Dog.prototype
//  */
// // 多态
// Dog.prototype = Object.create(Animal.prototype, {
//   constructor: {
//     value: 'Dog',
//     enumerable: false
//   },
//   name: {
//     value () {
//       return 'Dog'
//     }
//   }
// })
// console.log(new Dog() instanceof Animal);
// var p = new Dog()
// console.log(Dog.prototype.constructor);
// class Animal {
//   name () {
//     return 'Animal'
//   }
//   say () {
//     return 'I am ' + this.name()
//   }
// }
// class Dog extends Animal {
//   food='Bone'
//   name () {
//     return 'Dog'
//   }
// }
// console.log(new Dog().name());
// console.log(new Dog().food);
// console.log(Dog.prototype instanceof Animal);
