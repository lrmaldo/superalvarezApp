import React, {Component} from 'react';

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
} from 'react-native';

import FastImage from 'react-native-fast-image';

var {height, width} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Colors from './../Colors';
export default class ItemCateogorias extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: null,
      headerTransparent: 'true',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      categoria: this.props.navigation.getParam('categoria'),
      sucursal: this.props.navigation.getParam('sucursal'),
    };
  }
  render() {
    return <ScrollView style={styles.container}>{this.Cabecera()}</ScrollView>;
  }

  /* functions */

  Cabecera = () => {
    return (
      <View style={styles.containerCabecera}>
       <StatusBar barStyle="dark-content" />
        <FastImage
          key={this.state.categoria.id}
          style={styles.photo_categoria}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: this.state.categoria.url_imagen,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          defaultSource={{uri: this.state.categoria.url_imagen}}
        />
      </View>
    );
  };
}
