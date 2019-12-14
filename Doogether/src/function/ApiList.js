import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import axios from 'axios'
import ApiCard from './ApiCard'
import { View, Text } from 'react-native'

class ApiList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: '',
      refreshing: false
    }
  }

  readApi = async () => {
    const data = await axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts'
    })

    if (data.data) {
      this.setState({ results: data.data })
    }
  }

  componentDidMount() {
    this.readApi()
    setInterval(this.readApi, 1000)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#DFDFDF' }}>
        {(this.state.results === '') ?
          <Text style={{ textAlign: 'center', marginTop: 150, fontSize: 20 }}>
            Loading...
          </Text>
          :
          <View>
            {this.state.results.map((item, i) => (
              <ApiCard
                key={i}
                title={item.title}
                body={item.body} />
            ))}
          </View>
        }
      </View>
    )
  }
}

export default withNavigation(ApiList)