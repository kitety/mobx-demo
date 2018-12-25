import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// 学习基本概念的引入
import './mobx'
import { observe, action } from 'mobx'
import PropTypes from 'prop-types'

class Store {
  cache = { queue: [] }
}
const store = new Store()

class Bar extends Component {
  static propTypes = {
    queue: PropTypes.array
  }
  render () {
    const { queue } = this.props
    return <span>{queue.length}</span>
  }
}
class App extends Component {
  static propTypes = {
    cache: PropTypes.object
  }
  render () {
    const { cache } = this.props
    return (
      <div>
        <Bar queue={cache.queue} />
      </div>
    )
  }
}
// class App extends Component {
//   render () {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
