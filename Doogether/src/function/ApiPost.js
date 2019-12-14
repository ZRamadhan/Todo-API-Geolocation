import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import axios from 'axios'
import Modal from 'react-native-modal'
import { Text, Dimensions, TouchableOpacity } from 'react-native'
import { Button, Item, Input, Content, Container, Card, CardItem, Icon } from 'native-base'

class ApiPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      modalActive: false
    }
  }

  handlePost = async () => {
    const upload = await axios({
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: {
        title: this.state.title,
        body: this.state.body,
      }
    })

    if (upload.data.id) {
      this.setState({
        title: '',
        body: '',
        modalActive: true
      })
    }
    console.log('response', upload.data.id)
  }

  modalVisible = () => {
    this.setState({ modalActive: !this.state.modalActive })
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: '#FFF', flex: 1 }}>
          <Item style={{ flex: 1, flexDirection: 'column', marginVertical: 10, width: Dimensions.get('window').width * 4.5 / 5, alignSelf: 'center', borderColor: '#919191' }}>
            <Input
              placeholder="Insert Your Title Here"
              style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
              value={this.state.title}
              onChangeText={(text) => this.setState({ title: text })}
            />
          </Item>
          <Item style={{ flex: 1, flexDirection: 'column', width: Dimensions.get('window').width * 4.5 / 5, alignSelf: 'center' }}>
            <Input
              placeholder="Insert Your Text Here"
              style={{ backgroundColor: '#F1F1F1', color: 'black', width: '100%', height: 300, textAlignVertical: 'top' }}
              value={this.state.body}
              multiline={true}
              onChangeText={(text) => this.setState({ body: text })}
              />
          </Item>
        </Content>

        <Button style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffee54' }} onPress={this.handlePost}>
          <Text style={{ color: '#1a1a1d' }}>Send</Text>
        </Button>

        {/* Modal when succes */}
        <Modal isVisible={this.state.modalActive} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Card>
            <CardItem header style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Post Succeed</Text>

              <TouchableOpacity onPress={this.modalVisible}>
                <Icon type='EvilIcons' name='close' style={{ fontSize: 30 }} />
              </TouchableOpacity>
            </CardItem>
          </Card>
        </Modal>
      </Container>
    )
  }
}

export default withNavigation(ApiPost)