/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-alert */

/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Alert,
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
/* carga de  imagen rapido */

import FastImage from 'react-native-fast-image';


var {height, width} = Dimensions.get('window');
import {HeaderBackButton}  from 'react-navigation-stack';

import styles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
/* import url */

import {url_alvarez}  from '../../URLs/url';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      sucursal: this.props.navigation.getParam(
        'sucursal',
      ) /* obtener datos de la sucursal */,
      isLoading: true,
      loading: false, // cargar lista de paginacion
      productos:[],
      value:'',
      buscar_data:[],
    }; 
    /* cargar datos */
    this.GetData();
  }
static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state;
    //const {direccionTienda} =this.state
    //console.log(params.descripcion)
    return {
       headerLeft:  (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            params.regresar()
          }}
        />
      ),

    }
 }

  componentDidMount() {

this.props.navigation.setParams({
      regresar: this._regresar.bind(this),
      });

     
  }
   _regresar= ()=>{
      this.props.navigation.goBack()
    
  }

  /* obtener los datos  de los productos de la sucursal */

   GetData = () => {
    const id_sucursal = this.state.sucursal.id;
    // AsyncStorage.removeItem('cart');
    //Service to get the data from the server to render

    const url = url_alvarez+`/api/sucursal/productosSucursal/${id_sucursal}`;
  
    console.log(url);
    //console.log(this.state.sucursal.id);
    //console.log(this.state.dataFood)
    this.setState({loading: true});
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);


        this.setState({
          // isLoading: true,
          productos:response
         
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({refreshing: false, loading: false});
        //Alert.alert("","Ocurrio un problema con el servidor intentalo más tarde")
      });
  };

  buscar = (text) => {
    //const busqueda = text.toUpperCase()
    console.log(text);

    const busqueda = this.state.productos.filter((item) => {
      return item.titulo.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    console.log(JSON.stringify(busqueda));
    if (text == '') {
      this.setState({
        value: text,
        buscar_data: [],
      });
    } else {
      this.setState({
        value: text,
        buscar_data: busqueda,
      });
    }
  };


  getCategoriaTitulo(categoryId) {
    let titulo;
    this.state.dataCategorias.map((data) => {
      if (data.id === categoryId) {
        titulo = data.titulo;
      }
    });
    return titulo;
  }
  /* render de productos */

  renderProductos = ({item}) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressRecipiente(item)}>
      <View style={styles.containerRecipiente}>
        <Image style={styles.photo} source={{uri: item.url_imagen}} />
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.title}>${item.precio}</Text>
        <Text style={styles.category}>
          {this.getCategoriaTitulo(item.id_categoria)}
        </Text>
      </View>
    </TouchableHighlight>
  );

  /* al presionar en el recipiente  */

  
  Cabecera = () => {
    return (
     <View style={styles.containerCabecera}>
        <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    containerStyle={{
                      width:'100%',
                      marginTop:20,
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      borderRadius: 5,
                      borderBottomColor: 'transparent',
                      borderTopColor: 'transparent',
                      position:'absolute',
                      bottom:28,
                      justifyContent: 'center',
                      
                      flex: 1,
                    }}
                    //ref={search => params.search = search}
                    //onChangeText={(text) => this.SearchFilterFunction(text)}
                    //onClear={(text) => this.SearchFilterFunction('')}}
                    onChangeText={(text) => this.buscar(text)}
                    onClear={() => this.buscar('')}
                    inputContainerStyle={{
                      backgroundColor: 'white',
                      width: '100%',
                      alignSelf: 'center',
                    }}
                    placeholder="Buscar..."
                    autoFocus
                    pointerEvents='auto'
                    value={this.state.value}
                    style={{
                      marginLeft: 20,
                      margin: 5,
                      padding: 10,
                      alignSelf: 'center',
                     // textAlign: 'center',
                    }}
                  />
        
     </View>
    );
  };


  /* render producto */

   renderProductos = ({item}) => (
    <TouchableOpacity
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressRecipiente(item)}>
      <View style={styles.containerRecipiente}>
        {/*  <Image style={styles.photo} source={{ uri: 'http:\/\/test.sattlink.com\/imagenes\/sucursal\/Sucursal2\/productos\/test1\/producto1601583570.jpg' }} /> */}

        <FastImage
          key={item.id}
          style={styles.photo}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: item.url_imagen,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          defaultSource={{uri: item.foto_url}}
        />
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.title}>{Format_moneda(item.precio)}</Text>
        <Text style={styles.category}>
         {/*  {this.getCategoriaTitulo(item.id_categoria)} */}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /* al presionar en el recipiente  */

  onPressRecipiente = (item) => {
    this.props.navigation.navigate('DetalleProducto', {producto: item,sucursal:this.state.sucursal});
    //alert('hola presionaste');
  };

  render() {
    //console.log(this.state.dataBanners[0]);
    /* console.log(this.state.dataProductos) */
    return (
      <ScrollView style={styles.container}>
       {/*  <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" /> */}
       {this.Cabecera()}

       <View style={styles.infoContainer}>
            <FlatList
              numColumns={2}
              data={this.state.buscar_data}
              renderItem={this.renderProductos}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
      
      </ScrollView>
    );
  }

onClickAddCart =(item)=>{
Alert.alert("","Se agrego al carrito")
}

}
function Format_moneda(num) {
   var num = parseFloat(num);
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
