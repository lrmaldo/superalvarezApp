/* eslint-disable no-alert */

/* eslint-disable no-unused-vars */
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
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
/* import styles from './styles'; */
import {SearchBar, Badge} from 'react-native-elements';

/* carga de  imagen rapido */

import FastImage from 'react-native-fast-image';

import AsyncStorage from '@react-native-community/async-storage';
/* iconos */
import Icon from 'react-native-vector-icons/Ionicons';

/* carrusel */
//swiper
import Swiper from 'react-native-swiper';
var {height, width} = Dimensions.get('window');
import styles from './styles';

import Colors from '../Colors';

/* funciones de carrito */
import {OnClickAddCarrito} from '../../logica_carrito/script_carrito';

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
      sucursal: this.props.navigation.getParam('sucursal'),
      isLoading: true,
      loading: false, // cargar lista de paginacion
      dataBanners: [],
      dataCategorias: [],
      dataProductos: [],
      selectCatg: 0,
      visible: false,
      refreshing: true,
      icon: null,
      hasScrolled: false,
      dataaux: [],
      total_carrito: 0,
    };
    /* cargar datos */
    this.GetData(this.page);
  }

  /* obtener datos de la sucursal */
  GetData = (page) => {
    const id_sucursal = this.state.sucursal.id;
    // AsyncStorage.removeItem('cart');
    //Service to get the data from the server to render

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

        /* var listData = this.state.dataSucursales;
        var data = listData.concat(responseJson.data.sucursales.data);
        var dataaux = responseJson.data.sucursales; */
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
          {this.getCategoriaTitulo(item.id_categoria)}
        </Text>

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

  /* al presionar en el recipiente  */

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

  banners = () => {
    return (
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Swiper
            style={{height: width / 0.99}}
            key={this.state.dataBanners.length}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={4}>
            {this.state.dataBanners.map((itembann) => {
              return (
                <Image
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{uri: itembann.url_imagen}}
                />
              );
            })}
          </Swiper>
        </View>
      </View>
    );
  };
  /* render buscador */

  renderBuscador = () => {
    return (
      <View style={styles.searchBar}>
        <Text style={styles.textBuscador}>Buscar</Text>
        {/* <Image
          style={styles.iconBuscador}
          source={require('./../../../img/icon/ic_search.png')}
        /> */}
      </View>
    );
  };

  /* recardado */

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.refreshing) return null;
    return (
      <View style={[styles.container1, styles.horizontal]}>
        <ActivityIndicator size="large" color="#ffea0f" />
      </View>
    );
  };
  handleLoadMore = () => {
    // console.log("en el handle")
    //  if(!this.state.hasScrolled){ return null; }
    if (!this.state.loading) {
      this.page = this.page + 1; // increase page by 1

      this.GetData(this.page); // method for API call
      //this.setState({hasScrolled:false})
    }
  };

  onScroll = () => {
    this.setState({hasScrolled: true});
    this.handleLoadMore();
  };

  /* recargarcon el swipe */

  onRefresh() {
    //Clear old data of the list
    this.setState({
      dataBanners: [],
      dataCategorias: [],
      dataProductos: [],
      refreshing: false,
    });

    this.page = 1;
    //Call the Service to get the latest data
    this.GetData(this.page);
    //this.GetData();
  }

  total_items = () => {
   return new Promise ( async (resolver, reject)=>{
     try {
       let total_car = await  AsyncStorage.getItem('carrito').then((datacarrito) => {
      //console.log(JSON.parse(datacarrito));
      if (datacarrito !== null) {
        const cart = JSON.parse(datacarrito);
        let cantidad_total=0;
        cart.forEach(element => {
          cantidad_total=cantidad_total+element.cantidad;
        });

        //console.log(cart.length)
        this.setState({
          total_carrito: cantidad_total,
        });
      } else {
        //return 0;
      }
    });
    resolver(total_car);
     } catch (error) {
       
     }
   })
  };

  render() {
    this.total_items();
   // console.log(this.state.total_carrito);
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        //loading view while data is loading
        <View style={[styles.container1, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ffea0f" />
        </View>
      );
    }
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
            colors={['#ef4b42', '#fff001', '#0000ff']}
          />
        }>
        {this.state.dataBanners.length == 0 ? (
          <View style={{marginTop: 35}} />
        ) : (
          this.banners()
        )}
        <SafeAreaView style={styles.infoRecipeContainer}>
         <View style={{flexDirection:'row'}}> 
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
              width: '95%',
              flex: 1,
            }}
            onPress={() => this.onPressBuscador()}>
            {this.renderBuscador()}
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => this.onPressCarrito()}
              style={{
                borderWidth: 1,

                borderColor: Colors.primario,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                backgroundColor: Colors.primario,
                borderRadius: 50,
                marginLeft: 5,
                marginRight:15,
              }}>
              <Icon name={'cart'} size={30} color={Colors.negro} />
              {this.state.total_carrito > 0 ? (
                <Badge
                  status="success"
                  value={this.state.total_carrito}
                  containerStyle={{position: 'absolute', top: -4, right: -4}}
                />
              ) : null}
            </TouchableOpacity>
         </View>
          <View style={{margin: 10}} />
          <View style={{flexDirection: 'row'}}>
            {/* onpress al detalle sucursal */}
            <TouchableOpacity onPress={() => this.onPressSucursal()}>
              <Text style={styles.infoRecipeName}>
                {this.state.sucursal.name}
              </Text>
            </TouchableOpacity>

           
          </View>

          <View style={styles.infoContainer}>
            <FlatList
              numColumns={2}
              data={this.state.dataProductos}
              renderItem={this.renderProductos}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

function Format_moneda(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
