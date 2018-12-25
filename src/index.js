import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { action, observable, computed, observe, spy, toJS, trace } from 'mobx'
import PropTypes from 'prop-types'
//被修饰的数组不是真正的数组，现在已经修复，不会报错了
import { PropTypes as ObservablePropTypes, observer } from 'mobx-react'
import './App.css'
import './mobx'

// 监控所有的时间
// spy(event=>console.log(event))
class Todo {
  id = Math.random()
  @observable title = ''
  @observable finished = false
  @action.bound toggle () {
    this.finished = !this.finished
  }
  constructor(title) {
    this.title = title
  }
}
class Store {
  dispoders = []
  constructor() {
    // 返回一个函数，如果这个被执行的话，observe就会停止监视
    // change.object 数据变化之后的状态  但是递归监控很麻烦
    observe(this.todos, change => {
      // 依次调用解除监控
      this.dispoders.forEach(dispoder => dispoder())
      this.dispoders = []
      for (const todo of change.object) {
        let dispoderN = observe(todo, changex => {
          // console.log(changex)
          this.save()
        })
        this.dispoders.push(dispoderN)
      }
      // console.log(change);
      this.save()
    })
  }
  save () {
    const todoString = JSON.stringify(toJS(this.todos))
    localStorage.setItem('todo', todoString)
  }
  @observable todos = []
  @action.bound createTodo (title) {
    //  放在数组前面
    this.todos.unshift(new Todo(title))
  }
  @action.bound pushTodo (item) {
    //  放在数组前面
    this.todos.push(item)
  }
  @action.bound removeTodo (todo) {
    this.todos.remove(todo)
  }
  @computed get left () {
    return this.todos.filter(todo => !todo.finished).length
  }
}
var store = new Store()
@observer
class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired
    })
  }
  handleClick = e => {
    this.props.todo.toggle()
  }
  render () {
    trace()
    const { todo } = this.props
    return (
      <div>
        <input type="Checkbox" className="toggle" checked={todo.finished} onChange={this.handleClick} />
        <span className={['title', todo.finished && 'finished'].join(' ')}>{todo.title}</span>
      </div>
    )
  }
}
@observer
class TodoFooter extends Component {
  render () {
    trace()
    return (
      <div>{this.props.store.left} item(s) unfinished!</div>
    )
  }
}
@observer
class TodoView extends Component {
  render () {
    trace()
    return (
      this.props.todos.map(todo => {
        return (
          <li className="todo-item" key={todo.id}>
            <TodoItem todo={todo} />
            <span className="remove" onClick={e => store.removeTodo(todo)}>X</span>
          </li>
        )
      })
    )
  }
}
@observer
class TodoHeader extends Component {
  state = {
    inputVal: ''
  }
  handleSubmit = e => {
    e.preventDefault();
    let { store } = this.props
    store.createTodo(this.state.inputVal)
    this.setState({
      inputVal: ''
    })
  }
  handleChange = e => {
    var inputVal = e.target.value
    this.setState({
      inputVal
    })
  }
  render () {
    trace()
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.inputVal} className="input" />
      </form>
    )
  }
}
@observer
class TodoList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      createTodo: PropTypes.func,
      todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
    }).isRequired
  }
  componentWillMount () {
    if (localStorage['todo']) {
      const todosArr = JSON.parse(localStorage['todo'])
      todosArr.forEach(todoEle => {
        this.props.store.pushTodo(todoEle)
      })
    }
  }

  render () {
    trace()
    const { store } = this.props
    return (
      <div className="todo-list">
        <header>
          <TodoHeader store={store} />
        </header>
        <ul>
          <TodoView todos={store.todos} />
        </ul>
        <footer>
          { /* <div>{store.left} item(s) unfinished!</div> */}
          <TodoFooter store={store} />
        </footer>
      </div>
    )
  }
}
/**
 * 性能优化三方法
 * 尽可能细的拆分组件
 * 专门用组件处理列表
 * 尽可能晚解构可观察数据
 */

// 为了保证单独的数据来源，就用传参
ReactDOM.render(<TodoList store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
