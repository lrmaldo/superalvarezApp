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
/* import styles from './styles'; */
import {SearchBar} from 'react-native-elements';
/* colores */
import Colors from './../Colors';


/* carga de  imagen rapido */

import FastImage from 'react-native-fast-image';

var {height, width} = Dimensions.get('window');
/* 
import styles from './styles'; */

import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';



export default class App extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      //headerTransparent: 'true',
      title: null,
        
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
    //console.log(this.state.sucursal);
    return (
      <View style={styles.containerCabecera}>
        {this.state.sucursal.url_imagen===null ?
        <Image
          style={styles.imagenPortada}
          resizeMode="cover"
          source={require('../../../img/logo.jpg')}
          width={'100%'}
          height={280}
        />: 
        <Image
          style={styles.imagenPortada}
          resizeMode="cover"
          source={{uri: this.state.sucursal.url_imagen}}
        />  }
      </View>
    );
  };

  /* separador */
  Separator = () => (
    <View style={styles.containerS}>
      <View style={styles.separatorOffset} />
      <View style={styles.separator} />
    </View>
  );

  Direccion = () => {
    const url = Platform.select({
      ios: `maps://app?daddr=${this.state.sucursal.lat},${this.state.sucursal.lon}&t=s`,
      android: `google.navigation:q=${this.state.sucursal.lat},${this.state.sucursal.lon}`,
    });

    return (
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <View style={[styles.containerD, styles.emailContainer]}>
          <View style={styles.IconRow}>
            <Icon3
              name="directions"
              underlayColor="transparent"
              style={styles.direccionIcon}
              //onPress={() => onPressEmail()}
            />
          </View>
          <View style={styles.direccionRow}>
            <View style={styles.direccionNameColumn}>
              <Text style={styles.direccionNameText}></Text>
            </View>
            <View style={styles.direccionColumn}>
              <Text style={styles.direccionText}>
                {this.state.sucursal.direccion}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /* telefono  */

  Telefono = () => {
    return (
      <TouchableOpacity
        style={styles.IconRow}
        onPress={() =>
          Linking.openURL(
            `tel://${this.state.sucursal.telefono}`,
          ).catch((err) => console.log('Error:', err))
        }>
        <Icon name="call" underlayColor="transparent" style={styles.telIcon} />
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{this.state.sucursal.telefono}</Text>
          </View>
          <View style={styles.telNameColumn}>
            <Text style={styles.telNameText}></Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  Whatsapp = () => {
    return (
      <TouchableOpacity style={styles.IconRow} onPress={() => Linking.openURL(`https://wa.me/52${this.state.sucursal.whatsapp}`).catch(err => console.log('Error:', err))}>
         <Icon
              name="logo-whatsapp"
              underlayColor="transparent"
              style={styles.telIcon}
              
            />
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{this.state.sucursal.whatsapp}</Text>
          </View>
          <View style={styles.telNameColumn}>
            <Text style={styles.telNameText}></Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  Descripcion = () => {
     
       this.Separator()
     return ( 
        
        <View  style={styles.RowDescripcion}>
          <Text style={styles.TextDescripcion}>{this.state.sucursal.descripcion}</Text> 
        </View>
       
       
       
     );
  }

  render() {
    //console.log(this.state.dataBanners[0]);
    /* console.log(this.state.dataProductos) */
  //console.log(this.state.sucursal.whatsapp.length);
         
     
    return (
      <ScrollView style={styles.container}>
        {this.Cabecera()}
        {this.Direccion()}
        {this.Separator()}
        {this.Telefono()}
        <View style={{marginTop:15,}} />
        { this.Separator()}
        {this.state.sucursal.whatsapp === null ?  null :
        this.Whatsapp()}
        {this.state.sucursal.descripcion === null ? null :
        this.Descripcion() }  
        
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  containerCabecera: {
    backgroundColor: Colors.primario,
    height: 280,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },

  imagenPortada: {
    height: 280,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },

  containerS: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  /* separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  }, */
  separator: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#EDEDED',
    borderWidth: 0.8,
    margin: 5,
  },

  /* style de direccion */

  containerD: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
    marginRight: 12,
  },
  direccionColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  direccionIcon: {
    color: Colors.primario,
    fontSize: 35,
  },
  direccionNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  direccionNameText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '200',
  },
  direccionRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  IconRow: {
    flex: 0.5,
    marginLeft: 17,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  direccionText: {
    fontSize: 16,
  },
  direccioniconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 20,
  },
  /* style de telefono */
  telIcon: {
    color: Colors.primario,
    fontSize: 35,
  },
  telRow: {
    flex: 4,
    flexDirection: 'row',
    marginLeft:40,
    justifyContent: 'flex-start',
  },
  telNameColumn: {
    //flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft:10,
  },
  telNameText: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '200',
  },
  telNumberColumn: {
     marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  RowDescripcion:{
    flex: 4,
    //marginLeft: 17,
    //flexDirection: 'column',
    justifyContent: 'center',
    /* justifyContent: 'flex-start', */
     alignSelf: 'center',
  },
  TextDescripcion:{
    fontSize:14,
    margin:30,
    textAlign:'center',
    marginHorizontal:10
  }
});
