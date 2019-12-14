import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import ApiList from '../function/ApiList'
import ApiPost from '../function/ApiPost'
import { Text } from 'react-native'
import { Container, Content, Header, Tabs, Tab } from 'native-base'

class ApiScreen extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: '5%' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>API</Text>
        </Header>

        <Tabs>
          <Tab heading='List'>
            <Content style={{ flex: 1, backgroundColor: '#DFDFDF' }}>
              <ApiList />
            </Content>
          </Tab>

          <Tab heading='Post'>
            <ApiPost />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

export default withNavigation(ApiScreen)