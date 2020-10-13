import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  Linking,
} from 'react-native';

import Colors from './../Colors';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
/* estilos */
import styles from './styles';

const {width: viewportWidth} = Dimensions.get('window');
const {width, height} = Dimensions.get('window');

export default class App extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      //headerTransparent: 'true',
      title: null,
      /*   headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ) */
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      carrito: null /* estado carrito */,
    };
    /* cargar datos */
    /* this.GetData(); */
  }

  /* renderizar */

  itemsCarrito = () => {
    /* this.carrito.map(item,i)=>{} */
    /*  <View  style={styles.item_carro}>
            <Image resizeMode={'contain'}
                  style={styles.imagenItem}
                  source={require('../../../img/logo.jpg')}
                   />

          </View> */

    return (
      <View
        style={styles.item_carro}>
        <Image
          resizeMode={'contain'}
          style={styles.imageItem}
          source={require('../../../img/logo.jpg')}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'trangraysparent',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}></Text>
            <Text>...</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#f9aa34',
                fontSize: 20,
              }}></Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity>
                <Icon name="ios-remove-circle" size={35} color={'#f9aa34'} />
              </TouchableOpacity>
              <Text
                style={{
                  paddingHorizontal: 8,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}></Text>
              <TouchableOpacity>
                <Icon name="ios-add-circle" size={35} color={'#f9aa34'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 20}} />
        <Text style={{fontSize: 32, fontWeight: 'bold', color: '#f9aa34'}}>
          Carrito
        </Text>
        <View style={{height: 10}} />

        <View style={{flex: 1}}>
          <ScrollView style={{flex: 2}}>{this.itemsCarrito()}</ScrollView>
        </View>
      </View>
    );
  }
}
