import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'antd'
import axios from 'axios'
import './style.css'

interface State {
  isLogin: boolean
  loaded: boolean
}

// Component接收泛型
// 第一个参数是props的类型
// 第二个是 state 的类型
class Home extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isLogin: true,
      loaded: false
    }
  }
  componentDidMount() {
    // 这里请求的是3000端口的, 我们要请求7001端口的, 需要修改 package.json , 添加 proxy 字段指向localhost:7001端口
    axios.get('/api/isLogin').then(res => {
      // 如果是没登陆的状态, 就把 isLogin 设置为 false
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          loaded: true
        })
      }
    })
  }
  render() {
    const { isLogin, loaded } = this.state
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <Button type="primary">爬取数据</Button>
            <Button type="primary">显示数据</Button>
            <Button type="primary">登出</Button>
          </div>
        )
      } else {
        return null
      }
    } else {
      return (
        <Redirect to="/login"/>
      )
    }
  }
}

export default Home
