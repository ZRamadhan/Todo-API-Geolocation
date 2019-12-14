import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'
import TodoCard from './TodoCard'
import { Text, View, TouchableOpacity, Button } from 'react-native'
import {
  Container, Header, Icon, Input, Item,
  Card, CardItem
} from 'native-base'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalActive: false,
      todo: '',
      todoList: [],
      todos: null,
      todoArray: null,
      uniqueIndex: null,
      deletedList: []
    }
  }

  modalVisible = () => {
    this.setState({ modalActive: !this.state.modalActive })
  }

  submitTodo = async () => {
    if (this.state.todo !== '') {
      let todoObj = {
        task: this.state.todo,
        key: Date.now()
      }
      await this.state.todoList.push(todoObj)

      AsyncStorage.setItem('@todos', JSON.stringify(this.state.todoList))

      this.setState({ todo: '' })
    }
  }

  readTodos = async () => {
    let arrayString = await AsyncStorage.getItem('@todos')
    let todoArray = await JSON.parse(this.state.todos)

    this.setState({ todos: arrayString, todoArray: todoArray })

    if (this.state.todoList === 0 && todoArray.length !== 0) {
      this.setState({
        todoList: todoArray
      })
    }
  }

  deleteTodo = async () => {
    let index = this.props.navigation.getParam('uniqueIndex')
    this.setState({
      uniqueIndex: index
    })

    if (this.state.uniqueIndex !== null && this.state.uniqueIndex !== undefined) {
      let filterIndex = await this.state.todoArray.filter((item) => {
        return (item.key !== this.state.uniqueIndex)
      })

      this.setState({
        deletedList: filterIndex
      })

      if (this.state.deletedList.length !== 0 || this.state.deletedList.length === 0) {
        this.state.todoList.splice(0, this.state.todoList.length, ...this.state.deletedList)

        AsyncStorage.setItem('@todos', JSON.stringify(this.state.deletedList))
      }
    }
  }

  componentDidMount() {
    this.readTodos()
    setInterval(this.readTodos, 500)

    this.deleteTodo()
    setInterval(this.deleteTodo, 500)
  }

  render() {
    return (
      <Container>
        <Header hasSegment style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: '5%' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>TODO</Text>
        </Header>

        {(this.state.todoArray === null) ?
          <Text style={{ textAlign: 'center', marginTop: 150, fontSize: 20 }}>
            You do not have any task yet
          </Text>
          :
          <View>
            {this.state.todoArray.map((item, i) => (
              <View key={i}>
                <TodoCard
                  key={i}
                  name={item.task}
                  index={item.key} />
              </View>
            ))}
          </View>
        }

        {/* Floating button */}
        <View style={{ position: 'absolute', bottom: 10, right: 10, backgroundColor: '#1a1a1d', borderRadius: 26 }}>
          <TouchableOpacity onPress={this.modalVisible}>
            <Icon type='Feather' name='plus' style={{ fontSize: 52, color: 'white' }} />
          </TouchableOpacity>
        </View>

        {/* Modal box to add todo */}
        <Modal isVisible={this.state.modalActive} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Card>
            <CardItem header style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Add todo</Text>

              <TouchableOpacity onPress={this.modalVisible}>
                <Icon type='EvilIcons' name='close' style={{ fontSize: 30 }} />
              </TouchableOpacity>
            </CardItem>

            <CardItem>
              <Item regular style={{ borderColor: 'white' }}>
                <Input placeholder='Text input goes here ...' color='white'
                  value={this.state.todo}
                  onChangeText={(text) => this.setState({ todo: text })} />
              </Item>
            </CardItem>

            <Button title="Submit" onPress={this.submitTodo} color='#1a1a1d' />
          </Card>
        </Modal>
      </Container>
    )
  }
}

export default withNavigation(TodoList)