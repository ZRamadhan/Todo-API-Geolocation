import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import TodoList from '../function/TodoList'

class TodoScreen extends Component {
  render() {
    return (
      <TodoList />
    )
  }
}

export default withNavigation(TodoScreen)