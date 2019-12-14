import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import Geolocation from '@react-native-community/geolocation';
import { Text, Alert, Modal, View, Linking } from 'react-native'
import { Container, Content, Button, Spinner, Toast } from 'native-base'

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: null,
      error: null,
      isLoading: false,
      latitude: null,
      longitude: null
    }
  }

  getLocation = () => {
    Geolocation.getCurrentPosition(position => {
      const location = position.coords
      this.setState({
        location, isLoading: false,
        latitude: location.latitude,
        longitude: location.longitude
      })
    },
       this.locationFail,

      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )

    if (this.state.location === null) {
      this.setState({
        isLoading: true
      })
    }
    else {
      this.setState({
        isLoading: false
      })
    }
  }

  locationFail = (err) => {
    Alert.alert(err.message)
    this.setState({
      isLoading: false
    })
  }

  render() {
    console.log('location', this.state.location)
    console.log('location', this.state.latitude)
    console.log('location', this.state.longitude)

    return (
      <Container>
        <Content>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '50%' }}>Press the yellow button to get your location</Text>
          {this.state.location && (
            <View>
              <Text style={{ fontSize: 16, textAlign: 'center', marginTop: '50%' }}>
                {`Latitude : ${this.state.location.latitude}`} {'\n'}
                {`Longitude : ${this.state.location.longitude}`}
              </Text>

              <Button rounded style={{ display: 'flex', justifyContent: 'center', width: '50%', marginLeft: '25%', marginTop: 20, backgroundColor: '#ffee54' }}
                onPress={() => Linking.openURL(`https://www.google.com/maps/@${this.state.latitude},${this.state.longitude}z`)}>
                <Text style={{ color: '#1a1a1d' }}>Open Maps</Text>
              </Button>
            </View>
          )}
        </Content>

        <Button style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffee54' }} onPress={this.getLocation}>
          <Text style={{ color: '#1a1a1d' }}>Get My Location</Text>
        </Button>

        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.isLoading}
          onRequestClose={() => Toast.show({ text: `Please wait until the proccess done` })}>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color="#ffee54" />
          </View>
        </Modal>
      </Container>
    )
  }
}

export default withNavigation(Location)