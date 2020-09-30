/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Image, Platform, Dimensions} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

// import icons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
///dimension del ios
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const {height, width} = Dimensions.get('window');
export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

/* views */

import Inicio from '../screens/Inicio/Inicio';
/* vista sucursal */
import Sucursal from '../screens/Sucursal/Sucursal';

const TabIconInicio = (props) => (
  <Icon name="md-home" size={30} color={props.focused ? 'black' : 'darkgrey'} />
);

const HomeNavigator = createStackNavigator({
 " Inicio": {
    screen: Inicio,
    navigationOptions: {
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#ffea00',
      },
    },
  },

  /* vista sucursal */
   'Sucursal': {
    screen: Sucursal,
    navigationOptions: {
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#ffea00',
      },
    },
  },
});

const BottonNavegation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: 'Inicio',
        tabBarIcon: TabIconInicio,
        /* #ffff56 
      #ff9958*/

        // tabBarIcon: ({activeTintColor}) => <FontAwesome name="home" color={"white"}></FontAwesome>
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#000000',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffea00',
      },
    },
  },
);

export default createAppContainer(BottonNavegation);
/* 
color primario:  #ffea00
secundario: #ffff56
accentuacion: #c7b800

 */
