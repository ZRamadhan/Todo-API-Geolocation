import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TodoScreen from '../screen/TodoScreen'
import ApiScreen from '../screen/ApiScreen'
import LocationScreen from '../screen/LocationScreen'

const PageApp = createMaterialBottomTabNavigator({
  Todo: {
    screen: TodoScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Todo',
      tabBarIcon: ({tintColor}) => (
        <Icon type='FontAwesome5' name='list-alt' size={20} color={tintColor}/>
      )
    })
  },
  Api: {
    screen: ApiScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Api',
      tabBarIcon: ({tintColor}) => (
        <Icon type='FontAwesome5' name='fire-alt' size={20} color={tintColor}/>
      )
    })
  },
  Location: {
    screen: LocationScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Location',
      tabBarIcon: ({tintColor}) => (
        <Icon type='FontAwesome5' name='search-location' size={20} color={tintColor}/>
      )
    })
  }
},
  {
    initialRouteName: 'Todo',
    headerMode: 'none',
    activeColor: '#ffee54',
    inactiveColor: '#ffffff',
    barStyle: {backgroundColor: '#1a1a1d'}
  });

export const AppContainer = createAppContainer(PageApp);