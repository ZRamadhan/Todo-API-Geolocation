import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import TodoList from './TodoList'
import { Text, View, TouchableOpacity } from 'react-native'
import { CheckBox, Icon } from 'native-base'

class TodoCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: null,
      isChecked: false,
      key: null
    }
  }

  readTodos = () => {
    let name = this.props.name
    this.setState({ todo: name })
  }

  checkedCard = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  componentDidMount() {
    this.readTodos()
    setInterval(this.readTodos, 1000)
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ display: 'flex', flexDirection: 'row', marginLeft: '1%', marginRight: '3%', justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ width: '10%', marginTop: '0.5%' }}>
            <CheckBox checked={this.state.isChecked} onPress={this.checkedCard}/>
          </View>

          <View style={{ alignSelf: 'flex-start', width: '80%' }}>
            <Text style={{ fontSize: 16 }}>{this.state.todo}</Text>
          </View>

          <View style={{ marginTop: '0.5%' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Todo', {uniqueIndex: this.props.index})}>
              <Icon type='FontAwesome5' name='trash-alt' style={{ fontSize: 18 }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 1.5, width: '93%', backgroundColor: 'black', marginTop: '2%', marginBottom: '2%' }} />
      </View>
    )
  }
}

export default withNavigation(TodoCard)