/* eslint-disable no-unused-vars */
import React from 'react';
import {View, Image, Platform, Dimensions} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
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
/* vista DetalleProducto */
import DetalleProducto from '../screens/DetalleProducto/DetalleProducto';
/* vista de buscador */
import Buscador from '../screens/buscador/buscador';
/* vista detalle sucursal */
import DetalleSucursal from '../screens/DetalleSucursal/DetalleSucursal';
/* vista carrito */
import Carrito from '../screens/Carrito/Carrito';

/* vista categorias */
import Categorias from '../screens/Categorias/Categorias';
/* item Categorias */
import ItemCategorias from '../screens/Categorias/ItemCateogorias';

/* perfil */
import Perfil from '../screens/perfil/Perfil';
import Mispedidos from '../screens/perfil/Mispedidos';
import Misdirecciones from '../screens/perfil/Misdirecciones';

/* Checkout */
import Checkout from '../screens/Checkout/Checkout';

const TabIconInicio = (props) => (
  <Icon name="md-home" size={30} color={props.focused ? 'black' : 'darkgrey'} />
);

const HomeNavigator = createStackNavigator({
  ' Inicio': {
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

  /* vista sucursal */
 'DetalleProducto': {
    screen: DetalleProducto,
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

  /* vista del buscador  */
  'Buscador': {
    screen: Buscador,
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
  /* vista detalle sucursal */

  'DetalleSucursal': {
    screen: DetalleSucursal,
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

  'Carrito': {
    screen: Carrito,
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
  'Categorias': {
    screen: Categorias,
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

  'ItemCategoria': {
    screen: ItemCategorias,
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

  /* vista perfil */

  'Perfil': {
    screen: Perfil,
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

  /* mis pedidos */
  'Mispedidos': {
    screen: Mispedidos,
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

  /* mis direcciones */

  'Misdirecciones': {
    screen: Misdirecciones,
    navigationOptions: {
      headerTitleAlign: 'center',
      title: 'Mi dirección',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#ffea00',
      },
    },
  },
  /* Checkout */

    'Checkout': {
    screen: Checkout,
    navigationOptions: {
      headerTitleAlign: 'center',
      title: null,
       headerStyle: {
        backgroundColor: '#ffea00',
      },
      
    },
  },

});

/* const BottonNavegation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: 'Inicio',
        tabBarIcon: TabIconInicio,
      
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
); */
const stackNavigator = createSwitchNavigator(
  {
    App: HomeNavigator,
  },
  {
    initialRouteName: 'App',
  },
);

//export default createAppContainer(BottonNavegation);
export default createAppContainer(stackNavigator);

/* 
color primario:  #ffea00
secundario: #ffff56
accentuacion: #c7b800

 */
