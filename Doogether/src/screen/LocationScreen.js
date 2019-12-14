import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import Location from '../function/Location'
import { Text, View } from 'react-native'
import {Container, Header} from 'native-base'

class LocationScreen extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: '5%' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>LOCATION</Text>
        </Header>

        <Location />
      </Container>
    )
  }
}

export default withNavigation(LocationScreen)