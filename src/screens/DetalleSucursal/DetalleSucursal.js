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
} from 'react-native';
/* import styles from './styles'; */
import { SearchBar } from 'react-native-elements';
/* colores */
import Colors from'./../Colors';

/* carga de  imagen rapido */

import FastImage from 'react-native-fast-image';


var {height, width} = Dimensions.get('window');
/* 
import styles from './styles'; */

import Icon from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTransparent: 'true',
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
    this.page = 1;
    this.state = {
      sucursal: this.props.navigation.getParam(
        'sucursal',
      ) /* obtener datos de la sucursal */,
      
    }; 
    /* cargar datos */
    /* this.GetData(); */
  }
Cabecera = () => {
  console.log(this.state.sucursal)
    return (
     <View style={styles.containerCabecera}>
      <Image
            style={styles.imagenPortada}
            resizeMode="cover"
            source={{uri: this.state.sucursal.url_imagen}}
          />
        
     </View>
    );
  };


  render() {
    //console.log(this.state.dataBanners[0]);
    /* console.log(this.state.dataProductos) */
    return (
      <ScrollView style={styles.container}>
      {this.Cabecera()} 
      
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    
  },
  
  containerCabecera:{
    backgroundColor:Colors.primario,
    height:280,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    position:'relative',
  },

  imagenPortada:{
    height:280,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    position:'relative',
  }

});