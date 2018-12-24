import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { action, observable, computed } from 'mobx'
import PropTypes from 'prop-types'
//被修饰的数组不是真正的数组，现在已经修复，不会报错了
import { PropTypes as ObservablePropTypes, observer } from 'mobx-react'
import './App.css'

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
  @observable todos = []
  @action.bound createTodo (title) {
    //  放在数组前面
    this.todos.unshift(new Todo(title))
  }
  @action.bound removeTodo (todo) {
    //  放在数组前面
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
    const { todo } = this.props
    return (
      <div>
        <input type="Checkbox" className="toggle" checked={todo.finished} onChange={this.handleClick}  />
        <span className={['title', todo.finished && 'finished'].join(' ')}>{todo.title}</span>
      </div>
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
    const { store } = this.props
    const todos = store.todos
    return (
      <div className="todo-list">
        <header>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} value={this.state.inputVal} className="input" />
          </form>
        </header>
        <ul>
          {todos.map(todo => {
            return (
              <li className="todo-item" key={todo.id}>
                <TodoItem todo={todo} />
                <span className="remove" onClick={e => store.removeTodo(todo)}>X</span>
              </li>
            )
          })}
        </ul>
        <footer>
          <div>{store.left} item(s) unfinished!</div>
        </footer>
      </div>
    )
  }
}


// 为了保证单独的数据来源，就用传参
ReactDOM.render(<TodoList store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
