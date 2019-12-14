import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View } from 'react-native'
import { Card, CardItem, Body, Text } from 'native-base'

class ApiCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
  }

  readData = () => {
    const {title, body} = this.props
    this.setState({
      title, body
    })
  }

  componentDidMount() {
    this.readData()
    setInterval(this.readData, 500)
  }

  render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 24, fontFamily: 'Playfair', fontWeight: 'bold' }}>
                {this.state.title.toLowerCase().split(' ')
                  .map(letter => letter.charAt(0).toUpperCase() + letter.substr(1)).join(' ')}
              </Text>

              <Text note style={{ marginVertical: 5, fontSize: 14, fontFamily: 'Playfair' }}>
                {this.state.body}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  }
}

export default withNavigation(ApiCard)