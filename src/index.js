import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import {  action, observable } from 'mobx'
import PropTypes from 'prop-types'
//被修饰的数组不是真正的数组，现在已经修复，不会报错了
import { PropTypes as ObservablePropTypes,observer } from 'mobx-react'

class Store {
  @observable cache = { queue: [] }
  @action.bound refresh () {
    this.cache.queue.push(1)
  }
}
const store = new Store()

// 核心修饰，有用到queue属性
@observer
class Bar extends Component {
  //被修饰的数组不是真正的数组，现在已经修复，不会报错了
  static propTypes = {
    queue: PropTypes.array
  }
  render () {
    const { queue } = this.props
    return <span>{queue.length}</span>
  }
}
// 仅仅修饰这个没用，因为Foo没有用到queue属性
@observer
class App extends Component {
  static propTypes = {
    cache: PropTypes.object
  }
  render () {
    const { cache } = this.props
    return (
      <div>
        <Bar queue={cache.queue} />
        <button onClick={this.props.refresh}>Refresh</button>
      </div>
    )
  }
}

ReactDOM.render(<App cache={store.cache} refresh={store.refresh} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
