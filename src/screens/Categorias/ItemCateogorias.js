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
    this.page =1;
    this.state = {
      categoria: this.props.navigation.getParam('categoria'),
      sucursal: this.props.navigation.getParam('sucursal'),
      dataProductos: [],
      loading:true,
      refreshing: true,
      dataaux: [],
    };
  this.GetData(this.page);
  }
/* peticion al servidor  */

/* obtener datos de la sucursal */
  GetData = (page) => {
    const id_sucursal = this.state.sucursal.id;
   
    

    const url = `http://test.sattlink.com/api/sucursal/${id_sucursal}?page=${page}`;
    //const url = `http://test.sattlink.com/api/sucursal/${this.state.id_sucursal[0].id?page=${page}`;
    //const url =`http://markettux.sattlink.com/api/recursos?page=21`;

    this.setState({loading: true});
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);


        var listData = this.state.dataProductos;
        var data = listData.concat(response.data.productos);
        var dataaux = response.data.productos;

       
        this.setState({
          // isLoading: true,
          dataCategorias: response.data.categorias,
          dataBanners: response.data.banners,
          dataProductos: data,
          refreshing: false,
          loading: false,
          dataaux: dataaux,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({refreshing: false, loading: false});
        //Alert.alert("","Ocurrio un problema con el servidor intentalo más tarde")
      });
  };
/* function de categoria */

getCategoria =(categoryId) => {
    let dataC = [];
    this.state.dataProductos.map((data) => {
      if (data.id_categoria === categoryId) {
        dataC = data;
      }
    });
    
    return dataC;
  }



/* render */
  render() {


    //console.log("datacategarias"+this.getCategoria(this.state.categoria.id))
    return <ScrollView style={styles.container}>
    {this.Cabecera()}
    <View style={{marginBottom:5}}>
    <Text style={styles.titulo_categoria} > {this.state.categoria.titulo}</Text>
    </View>

     <View style={styles.infoContainer}>
              <FlatList
                numColumns={2}
                data={this.state.dataProductos.filter(item => item.id_categoria === this.state.categoria.id)}
                renderItem={this.renderProductos}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>

    </ScrollView>;
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

  renderProductos = ({item}) => (
    //console.log(item)
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
        

        <TouchableOpacity
          onPress={() => OnClickAddCarrito(item)}
          style={{
            width: width / 2 - 40,
            backgroundColor: Colors.primario,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            padding: 3,
            margin: 5,
          }}>
          <Text style={{fontSize: 12, color: 'black', fontWeight: 'bold'}}>
            Agregar carrito
          </Text>
          <View style={{width: 12}} />
          <Icon name="ios-add-circle" size={15} color={'black'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  




/* onpress */

onPressRecipiente = (item) => {
    this.props.navigation.navigate('DetalleProducto', {producto: item});
    //alert('hola presionaste');
  };

  /*  al presionar el boton buscador */
  onPressBuscador = () => {
    this.props.navigation.navigate('Buscador', {sucursal: this.state.sucursal});
  };
  onPressSucursal = () => {
    this.props.navigation.navigate('DetalleSucursal', {
      sucursal: this.state.sucursal,
    });
  };
  onPressCarrito = () => {
    this.props.navigation.navigate('Carrito', {sucursal: this.state.sucursal});
  };
   onPressCategorias = () => {
    this.props.navigation.navigate('Categorias', {sucursal: this.state.sucursal, categorias: this.state.dataCategorias});
  };
}
function Format_moneda(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
