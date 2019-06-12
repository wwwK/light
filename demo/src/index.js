import { h, render, Component } from '../../dist'

class Clock extends Component {
  render() {
    let time = new Date().toLocaleTimeString()
    return <span>{time}</span>
  }
}

// 将一个时钟渲染到 <body > 标签:
render(<Clock />, document.body)
